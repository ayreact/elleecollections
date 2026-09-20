'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/store';
import { Category } from '@/lib/types';

interface Props {
  categories: Category[];
}

export default function StoreInitializer({ categories }: Props) {
  useEffect(() => {
    useStore.setState({ categories });
  }, [categories]);

  return null;
}
