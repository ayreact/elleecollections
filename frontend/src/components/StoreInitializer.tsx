'use client';

import { useRef } from 'react';
import { useStore } from '@/store/store';
import { Category } from '@/lib/types';

interface Props {
  categories: Category[];
}

export default function StoreInitializer({ categories }: Props) {
  const initialized = useRef<boolean | null>(null);

  if (initialized.current == null) {
    useStore.setState({ categories });
    initialized.current = true;
  }

  return null;
}
