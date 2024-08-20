import { Session } from 'next-auth';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import { useUserStore } from '@/providers/user-store-provider';
import defaultImageProfile from '@/public/images/default-profile.jpg';

export function IsValidEmail(email: string): boolean {
  return /\S+@\S+\.\S+/.test(email);
}

export function IsValidName(name: string): boolean {
  if (name.trim() !== '' && name.length >= 3) {
    return true;
  }

  return false;
}

export function correctImage(image_url: string | null | undefined): string | StaticImport {
  let imageProfile: string | StaticImport;

  if (image_url) {
    imageProfile = image_url;
  } else {
    imageProfile = defaultImageProfile;
  }

  return imageProfile;
}

export default function useUserInfo({ data }: { data: Session }): {
  name: string;
  imageProfile: string | StaticImport;
} {
  const { image_url, nickname } = useUserStore((state) => state);
  let name = nickname;

  if (nickname === '') {
    name = data.user?.name as string;
  }

  let imageProfile;
  if (image_url === '') {
    imageProfile = correctImage(data.user?.image as string);
  } else {
    imageProfile = correctImage(image_url);
  }

  return {
    name,
    imageProfile,
  };
}

export function slugify(url: string): string {
  url = url.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
  url = url.toLowerCase(); // convert string to lowercase
  url = url
    .replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-'); // remove consecutive hyphens
  return url;
}

export function ensureHttpOrHttps(url: string): string {
  const httpPattern = /^http:\/\//i;
  const httpsPattern = /^https:\/\//i;

  if (httpPattern.test(url) || httpsPattern.test(url)) {
    // Si empieza con http:// o https://, lo dejamos tal cual
    return url;
  } else {
    // Si no tiene ningún prefijo, agregamos https://
    return `https://${url}`;
  }
}
