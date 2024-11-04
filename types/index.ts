export type ID = string;

export interface Column {
    id: ID;
    title: string;
    tasks: Task[];
}

export interface Task {
    id: ID;
    title: string;
    createdAt: Date;
}

// export declare function useLocalStorage(
//   key: string,
//   initialValue: MaybeRefOrGetter<string>,
//   options?: UseStorageOptions<string>,
// ): RemovableRef<string>
// export declare function useLocalStorage(
//   key: string,
//   initialValue: MaybeRefOrGetter<boolean>,
//   options?: UseStorageOptions<boolean>,
// ): RemovableRef<boolean>
// export declare function useLocalStorage(
//   key: string,
//   initialValue: MaybeRefOrGetter<number>,
//   options?: UseStorageOptions<number>,
// ): RemovableRef<number>
// export declare function useLocalStorage<T>(
//   key: string,
//   initialValue: MaybeRefOrGetter<T>,
//   options?: UseStorageOptions<T>,
// ): RemovableRef<T>
// export declare function useLocalStorage<T = unknown>(
//   key: string,
//   initialValue: MaybeRefOrGetter<null>,
//   options?: UseStorageOptions<T>,
// ): RemovableRef<T>