export const getUploadUrl = (file: string) => {
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/nvl_media/${file}`
}