
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';

type UserCardProps = {
  user: {
    id: string;
    username: string;
    fullName: string;
    email: string;
    role: string;
    position: string;
    unit: string;
    workArea: string;
    status: string;
  };
  getRoleBadge: (role: string) => React.ReactNode;
  getStatusBadge: (status: string) => React.ReactNode;
};

const UserCard = ({ user, getRoleBadge, getStatusBadge }: UserCardProps) => {
  return (
    <Card className="border border-gray-200">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-sm">{user.fullName}</h3>
              <p className="text-xs text-gray-600">@{user.username}</p>
            </div>
            <div className="flex space-x-1">
              <Button size="sm" variant="outline" className="p-1 h-8 w-8">
                <Edit className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="outline" className="p-1 h-8 w-8">
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <div className="text-xs text-gray-600">
            <p>{user.email}</p>
            <p className="mt-1">{user.position} • {user.unit}</p>
            <p>{user.workArea}</p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              {getRoleBadge(user.role)}
              {getStatusBadge(user.status)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
