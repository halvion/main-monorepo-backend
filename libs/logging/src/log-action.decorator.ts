import { SetMetadata } from '@nestjs/common';

export const LOG_ACTION_KEY = 'log_action';

/**
 * Decorator to specify custom action name for logging
 * Usage: @LogAction('CREATE_BOOKING')
 */
export const LogAction = (action: string) =>
  SetMetadata(LOG_ACTION_KEY, action);
