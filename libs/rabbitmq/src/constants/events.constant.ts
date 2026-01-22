/**
 * Event names for Saga choreography
 */
export const BOOKING_EVENTS = {
  // Booking Service → Payment Service
  BOOKING_CREATED: 'booking.created',
  BOOKING_CANCELLED: 'booking.cancelled',
  
  // Payment Service → Booking Service
  PAYMENT_SUCCESS: 'payment.success',
  PAYMENT_FAILED: 'payment.failed',
  REFUND_PROCESSED: 'refund.processed',
  
  // Booking Service → Venue Service
  SLOT_LOCK_REQUEST: 'slot.lock.request',
  SLOT_RELEASE_REQUEST: 'slot.release.request',
  
  // Venue Service → Booking Service
  SLOT_LOCKED: 'slot.locked',
  SLOT_LOCK_FAILED: 'slot.lock.failed',
  SLOT_RELEASED: 'slot.released',
} as const;

export type BookingEvent = (typeof BOOKING_EVENTS)[keyof typeof BOOKING_EVENTS];

/**
 * Queue names for each service
 */
export const QUEUES = {
  CORE_SERVICE: 'core-service-queue',
  VENUE_SERVICE: 'venue-service-queue',
  BOOKING_SERVICE: 'booking-service-queue',
  PAYMENT_SERVICE: 'payment-service-queue',
} as const;

/**
 * Exchange name for topic-based routing
 */
export const EXCHANGE_NAME = 'thesis-exchange';
