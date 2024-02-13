import { create } from 'zustand';
import { Post } from './../types/index';
import { v4 as uuidv4 } from 'uuid';

// const mypost = [
//    {
//     id: uuidv4(),
//     title: 'ola'
//    },{
//     id: uuidv4(),
//     title: 'Ver'
//    }
// ] as Post[]

type PostStore = {
    posts: Post[]
    add: (post: Post) => void
}

export const usePostStore = create<PostStore>()((set) => ({
    posts: [],
    add: (post: Post) =>
        set((state) => ({
            posts: [...state.posts, post],
        })),
}))