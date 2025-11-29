export type UserPermissions = {
  can_comment: boolean;
  can_create_post: boolean;
  can_delete_post: boolean;
};

export const UserPermissionLabels: Record<keyof UserPermissions, string> = {
  can_comment: "Can Comment",
  can_create_post: "Can Create Post",
  can_delete_post: "Can Delete Post",
};

export enum AuthorStatus {
  NOT_REQUESTED,
  PENDING,
  APPROVED,
  REJECTED,
}
export const AuthorStatusLabels: Record<AuthorStatus, string> = {
  [AuthorStatus.NOT_REQUESTED]: "Not Requested",
  [AuthorStatus.PENDING]: "Pending",
  [AuthorStatus.APPROVED]: "Approved",
  [AuthorStatus.REJECTED]: "Rejected",
};

export const AuthorStatusMessages: Record<AuthorStatus, string> = {
  [AuthorStatus.NOT_REQUESTED]: "You have not requested author access yet.",
  [AuthorStatus.PENDING]: "Your author request is pending approval.",
  [AuthorStatus.APPROVED]:
    "You are approved as an author. You can create posts.",
  [AuthorStatus.REJECTED]: "Your author request has been rejected.",
};

export interface UserProfile {
  id: string;
  role: string;
  name: string;
  avatar_url: string | null;
  permissions: UserPermissions;
  author_status: AuthorStatus;
}

export interface AuthState {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  clearUser: () => void;
}
