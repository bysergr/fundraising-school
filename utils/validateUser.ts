import { Session } from 'next-auth';

import { type UserActions } from '@/stores/user-store';
import { type AppActions } from '@/stores/app-store';

export default async function validateUser(
  user: Session,
  updateUserInfo: UserActions['updateUserInfo'],
  setSignInStage: AppActions['setSignInStage'],
  closeSignInModal: AppActions['closeSignInModal'],
) {
  const response = await fetch(`/api/user/${user.user?.email}`, {
    method: 'GET',
    cache: 'no-store',
  });

  if (response.status !== 200) {
    setSignInStage('basic');
    return;
  }

  const data = await response.json();

  console.log({ data });

  if (data['phone_number'] === null) {
    setSignInStage('basic');
    return;
  }

  let userRole = 'guest';

  try {
    const response = await fetch(`/api/user/check/${user.user?.email}`, {
      method: 'GET',
    });

    if (response.ok) {
      const data = await response.json();

      console.log('Data:', data);

      const role = data['user']['response'];

      console.log('Role:', role);

      if (role !== undefined) {
        userRole = role;
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }

  updateUserInfo(
    data['nickname'] || (user.user?.name as string),
    data['contact_email'] || (user.user?.email as string),
    data['email'] || (user.user?.email as string),
    data['photo_url'] || (user.user?.image as string),
    userRole,
  );

  closeSignInModal();
}
