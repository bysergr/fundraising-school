import { type NextAuthOptions } from 'next-auth';
import LinkedInProvider from 'next-auth/providers/linkedin';

type Profile = {
  firstname: string | undefined;
  name: string;
  id: string;
  email: string;
  lastname: string | undefined;
  image: string | undefined;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function profile(profile: any): Promise<Profile> {
  return {
    id: profile.sub,
    name: profile.name,
    firstname: profile.given_name,
    lastname: profile.family_name,
    email: profile.email,
    image: profile.picture,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID ?? '',
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET ?? '',
      client: { token_endpoint_auth_method: 'client_secret_post' },
      authorization: { params: { scope: 'profile email openid' } },
      issuer: 'https://www.linkedin.com',
      jwks_endpoint: 'https://www.linkedin.com/oauth/openid/jwks',
      profile: profile,
      wellKnown: 'https://www.linkedin.com/oauth/.well-known/openid-configuration',
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
};

export const updateContactInfoUser = async ({
  contact_email,
  email,
  nickname,
}: {
  contact_email: string;
  email: string;
  nickname: string;
}) => {
  const response = await fetch('/api/user/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ contact_email, email, nickname }),
  });

  if (response.status !== 200) {
    throw new Error('Error updating contact info');
  }
};

export type RoundRequestBody = {
  seeking_capital: boolean;
  accept_terms_and_condition: boolean;
  email: string;
  round_name?: string;
};

export const updateRoundInfoUser = async (values: RoundRequestBody) => {
  const response = await fetch('/api/user/round', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });

  if (response.status !== 200) {
    throw new Error('Error updating contact info');
  }
};
