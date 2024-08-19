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

      const role = data['user']['response'];

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
    (user.user?.image as string) || data['photo_url'],
    userRole,
  );

  if (data['photo_url'] !== user.user?.image) {
    try {
      const reqBody: {
        email: string;
        photo_url?: string;
      } = {
        email: data?.user?.email as string,
      };

      if (user?.user?.image) {
        reqBody['photo_url'] = user?.user?.image as string;
      }

      const res = await fetch('/api/user/linkedin_photo', {
        method: 'POST',
        body: JSON.stringify(reqBody),
      });

      if (res.status !== 200 && res.status !== 201) {
        console.error('Error:', res.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  closeSignInModal();
}
