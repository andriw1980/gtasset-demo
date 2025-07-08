
import React from 'react';
import { Badge } from '@/components/ui/badge';

export const getRoleBadge = (role: string) => {
  const variants: Record<string, "default" | "secondary" | "destructive"> = {
    'admin': 'destructive',
    'staff': 'default',
    'auditor': 'secondary',
    'supervisor': 'secondary'
  };
  return <Badge variant={variants[role] || 'default'}>{role.toUpperCase()}</Badge>;
};

export const getStatusBadge = (status: string) => {
  return <Badge variant={status === 'Aktif' ? 'default' : 'secondary'}>{status}</Badge>;
};
