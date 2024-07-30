import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Session } from 'next-auth';

import { type UserActions } from '@/stores/user-store';
import { type AppActions } from '@/stores/app-store';

export default async function validateUser(
  user: Session,
  router: AppRouterInstance,
  updateUserInfo: UserActions['updateUserInfo'],
  setSignInStage: AppActions['setSignInStage'],
) {
  setSignInStage('basic');
}
