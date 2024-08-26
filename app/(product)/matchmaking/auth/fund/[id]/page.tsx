import { authOptions } from '@/utils/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getServerSession(authOptions);

  if (!data) {
    redirect('/matchmaking/');
  }

  let checkResponse: Response;
  try {
    checkResponse = await fetch(`${process.env.BACKEND_GATEWAY_URL}/user/register/${params.id}`, {
      method: 'GET',
    });
  } catch (e) {
    redirect('/matchmaking/');
  }

  if (!checkResponse.ok) {
    redirect('/matchmaking/');
  }

  try {
    const checkData = await checkResponse.json();

    if (checkData?.detail === 'Partner not found') {
      redirect('/matchmaking/');
    }
  } catch (e) {
    redirect('/matchmaking/');
  }

  let loginResponse: Response;
  try {
    const body = {
      nickname: data.user?.name,
      email: data.user?.email,
      partner_identifier: params.id,
    };

    console.log(JSON.stringify(body));

    loginResponse = await fetch(`${process.env.BACKEND_GATEWAY_URL}/user/add_normal_user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!loginResponse.ok) {
      redirect('/matchmaking/');
    }

    if (data.user?.image && data.user?.image !== '') {
      await fetch(`${process.env.BACKEND_GATEWAY_URL}/user/update/linkedin_and_photo_url`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.user?.email as string,
          photo_url: data.user?.image as string,
        }),
      });
    }
  } finally {
    redirect('/matchmaking/');
  }

  return <>Made with ❤️ by Sergio Rey</>;
}
