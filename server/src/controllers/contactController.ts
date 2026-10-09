import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { 
  createContactMessage, 
  getAllContactMessages, 
  updateMessageStatus,
  toggleMessageRead, 
  deleteContactMessage 
} from '../store/dataStore.js';
import { sanitizeString, sanitizeOptionalString } from '../utils/sanitize.js';
import { BadRequestError, NotFoundError } from '../middleware/errorHandler.js';

const contactInputSchema = z.object({
  senderName: z.string().min(2, 'Name must have at least 2 characters').max(100).optional(),
  name: z.string().min(2, 'Name must have at least 2 characters').max(100).optional(), // Compatibility alias
  email: z.string().email('Please enter a valid email address').max(150),
  subject: z.string().max(200).optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
}).refine(data => Boolean(data.senderName || data.name), {
  message: 'Sender name is required (min 2 characters)',
  path: ['name'],
});

const messageStatusSchema = z.object({
  status: z.enum(['unread', 'read', 'archived']).optional(),
  read: z.boolean().optional(),
});

const getParam = (req: Request, key: string): string => {
  const val = req.params[key];
  return Array.isArray(val) ? val[0] : (val || '');
};

// PUBLIC: Submit Contact Message
export const handleContactSubmission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parseResult = contactInputSchema.safeParse(req.body);

    if (!parseResult.success) {
      throw new BadRequestError('Validation failed for contact message', parseResult.error.flatten().fieldErrors);
    }

    const { senderName, name, email, subject, message } = parseResult.data;
    const resolvedName = sanitizeString(senderName || name || 'Anonymous');
    const sanitizedEmail = sanitizeString(email).toLowerCase();
    const sanitizedSubject = sanitizeOptionalString(subject) || 'Portfolio Inquiry';
    const sanitizedMessage = sanitizeString(message);

    const saved = await createContactMessage({
      senderName: resolvedName,
      email: sanitizedEmail,
      subject: sanitizedSubject,
      message: sanitizedMessage,
    });

    console.log(`[Contact Received] From: ${resolvedName} <${sanitizedEmail}>: "${sanitizedMessage.substring(0, 40)}..."`);

    return res.status(201).json({
      success: true,
      message: 'Your message has been successfully recorded. Thank you for reaching out!',
      data: {
        id: saved.id,
        senderName: saved.senderName,
        createdAt: saved.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ADMIN: Get All Contact Messages
export const getAdminMessages = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const messages = await getAllContactMessages();
    const unreadCount = messages.filter(m => m.status === 'unread' || !m.read).length;

    return res.status(200).json({
      success: true,
      data: messages,
      metrics: {
        total: messages.length,
        unread: unreadCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ADMIN: Mark message status or read/unread
export const updateAdminMessageStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = getParam(req, 'id');
    const parseResult = messageStatusSchema.safeParse(req.body);
    if (!parseResult.success) {
      throw new BadRequestError('Invalid message status payload', parseResult.error.flatten().fieldErrors);
    }

    let nextStatus = 'read';
    if (parseResult.data.status) {
      nextStatus = parseResult.data.status;
    } else if (parseResult.data.read !== undefined) {
      nextStatus = parseResult.data.read ? 'read' : 'unread';
    } else {
      const updatedToggle = await toggleMessageRead(id);
      if (!updatedToggle) {
        throw new NotFoundError(`Message with ID "${id}" not found.`);
      }
      return res.status(200).json({
        success: true,
        message: `Message status updated to ${updatedToggle.status}.`,
        data: updatedToggle,
      });
    }

    const updated = await updateMessageStatus(id, nextStatus);
    if (!updated) {
      throw new NotFoundError(`Message with ID "${id}" not found.`);
    }

    return res.status(200).json({
      success: true,
      message: `Message marked as ${updated.status}.`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// ADMIN: Toggle read status (backwards compatibility)
export const toggleAdminMessageRead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = getParam(req, 'id');
    const updated = await toggleMessageRead(id);
    if (!updated) {
      throw new NotFoundError(`Message with ID "${id}" not found.`);
    }

    return res.status(200).json({
      success: true,
      message: `Message marked as ${updated.status}.`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// ADMIN: Delete message
export const deleteAdminMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = getParam(req, 'id');
    const deleted = await deleteContactMessage(id);
    if (!deleted) {
      throw new NotFoundError(`Message with ID "${id}" not found.`);
    }

    return res.status(200).json({
      success: true,
      message: 'Message deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
