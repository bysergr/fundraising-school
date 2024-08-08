import { Session } from 'next-auth';

import { type UserActions } from '@/stores/user-store';
import { type AppActions } from '@/stores/app-store';

export default async function validateUser(
  user: Session,
  updateUserInfo: UserActions['updateUserInfo'],
  setSignInStage: AppActions['setSignInStage'],
  closeSignInModal: AppActions['closeSignInModal'],
) {
  const response = await fetch(`/api/user/${user.user?.email}`);

  if (response.status !== 200) {
    setSignInStage('basic');
    return;
  }

  const data = await response.json();

  if (data['phone_number'] === null) {
    setSignInStage('basic');
    return;
  }

  console.log(data);

  updateUserInfo(
    data['nickname'] || (user.user?.name as string),
    data['contact_email'] || (user.user?.email as string),
    data['email'] || (user.user?.email as string),
    data['photo_url'] || (user.user?.image as string),
    '',
  );

  closeSignInModal();
}
