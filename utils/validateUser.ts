import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';

import { AppLink } from '@/data/enums';
import { type UserActions } from '@/stores/user-store';

export default async function validateUser(
  user: Session,
  router: AppRouterInstance,
  updateUserInfo: UserActions['updateUserInfo'],
) {
  if (user.user?.name === '' || user.user?.name === null || !user.user?.name) {
    console.error('User name is empty');
    return;
  }

  let response;
  try {
    response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user }),
    });

    if (response.status !== 200) {
      console.error('Error validating user: ', response.status);
      return;
    }

    const data = await response.json();

    let image = '';
    if (user.user.image) {
      image = user.user.image;
    }

    if (data.image_url !== image) {
      const responseUpdateImage = await fetch('/api/user/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: image, email: user.user.email as string }),
      });

      if (responseUpdateImage.status !== 200) {
        console.error('Error validating user: ', response.status);
      }
    }

    const roleResponse = await fetch(`/api/user/startups/${user.user.email as string}`, {
      method: 'GET',
    });

    if (roleResponse.status !== 200) {
      console.error('Error validating user: ', response.status);
    }

    const roleBody = await roleResponse.json();

    let role: string | undefined = roleBody['response'];

    if (role === undefined) {
      console.error('Error validating user: ', response.status);

      role = 'guest';
    }

    if (data.message === 'User exists') {
      updateUserInfo(data.nickname, data.contact_email, user.user.email as string, image, role);
      router.replace(AppLink.Product.Home);

      return;
    }

    if (data.message === 'User exist without contact info') {
      updateUserInfo('', '', user.user.email as string, image, role);
      router.replace(AppLink.Activation.BaseData);

      return;
    }

    if (data.message === 'User exist without info about round') {
      updateUserInfo(data.nickname, data.contact_email, user.user.email as string, image, role);
      router.replace(AppLink.Activation.Round);

      return;
    }

    if (data.message === 'User created') {
      updateUserInfo('', '', user.user.email as string, image, role);
      router.replace(AppLink.Activation.BaseData);

      return;
    }

    console.error('Error creating user');
  } catch (error) {
    console.error('Error validating user', error);

    if (!response) {
      console.error('Error validating user');
      return;
    }

    if (response.status === 400) {
      signOut({ callbackUrl: AppLink.Auth.SignIn });
    }
  }
}
