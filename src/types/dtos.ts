export interface AuthUser {
    id: string;
    email: string;
    role: 'USER' | 'EXPERT' | 'ADMIN';
    expert_profile?: {
        full_name: string;
        title: string;
        is_verified: boolean;
    };
}

export interface BlogListItem {
    id: string;
    title: string;
    category: string;
    createdAt: string; // ISO Date string
    author: {
        full_name: string;
        title: string;
    };
    is_saved: boolean;
}

export interface BlogDetail extends BlogListItem {
    content: string;
    // potentially other fields like reading time, etc.
}

export interface ExpertPublicProfile {
    id: string; // ExpertProfile ID or UserID depending on implementation. Usually UserID for links.
    full_name: string;
    title: string;
    bio: string;
    specialties: string; // JSON string or array
    is_verified: boolean;
}

export interface AppointmentItem {
    id: string;
    expert_id: string;
    user_id?: string; // For experts seeing their clients
    datetime: string;
    type: 'ONLINE' | 'IN_PERSON';
    status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
    expert?: {
        expert_profile: {
            full_name: string;
            title: string;
        }
    };
    client?: {
        email: string;
    };
    // UX Flags
    is_past: boolean;
    can_cancel: boolean;
    can_feedback: boolean;
}

export interface SavedPostItem {
    id: string; // SavedPost ID
    post: BlogListItem; // Nested post
}

export interface FeedbackStatus {
    can_feedback: boolean;
    has_feedback: boolean;
}

// Global API Response Structure
export interface ApiResponse<T> {
    success: true;
    data: T;
    error: null;
}

export interface ApiError {
    success: false;
    data: null;
    error: {
        code: 'FORBIDDEN' | 'UNAUTHORIZED' | 'VALIDATION_ERROR' | 'NOT_FOUND' | 'INTERNAL_ERROR';
        message: string;
    };
}
