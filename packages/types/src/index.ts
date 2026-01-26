export interface Note {
    id: number;
    userId: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    folderDetails: FolderDetails;
}

export type FolderDetails = {
    id: number;
    name: string;
};

export interface UserSession {
    access_token: string;
}

export type FolderDto = {
    id: number;
    userId: string;
    name: string;
    parentId: number | null;
    createdAt: string;
    updatedAt: string;
};

export type FolderTreeDto = FolderDto & { children: FolderTreeDto[] };
