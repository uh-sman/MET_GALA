import { Alert } from "react-native";
import { supabase } from "./supabase";
import { PostgrestResponse, PostgrestError, QueryError } from "@supabase/supabase-js";
import { PostProps } from "../app/(tabs)/create";
// import { uuid , fromString} from "uuidv4";
// import { v4 as uuidv4 } from "uuid";
// import uniqid from "uniqid";
export const signUp = async (form: any) => {
  try {
    // const { data: { session }, error } = await supabase.auth.signUp(form)
    const { username, email, password } = form;
    const user = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });
    if (user.error) console.log(user.error);
    return user;
  } catch (error: any | unknown) {
    throw new Error(error);
  }
};

export const signIn = async (form: any) => {
  try {
    const user = await supabase.auth.signInWithPassword(form);
    if (user.error) throw new Error("Something went wrong", user?.error);
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(session?.user?.user_metadata?.email_verified);
    return session?.user;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    console.log("logged out successfully");
  } catch (error: any) {
    console.log(error);
    throw new Error(error?.message || "Something went wrong");
  }
};

export const resendVerificationEmail = async (email: string) => {
  try {
    const response = await supabase.auth.resetPasswordForEmail(email);
    console.log("Verification email resent successfully!");
    return response;
  } catch (error) {
    console.error("Error resending verification email:", error);
    // Handle errors (e.g., invalid email, rate limiting)
  }
};

interface Post {
  user_id: string;
  title: string;
  subtitle: string;
  image: string;
  text: string;
}

interface CreatePostProps {
  title: string;
  subtitle: string;
  image: string;
  text: string;
}

export const upLoadPost = async (
  userId: string,
  form: PostProps
): Promise<PostgrestResponse<PostProps[]>> => {
  // const { user } = useGlobalContext()
  try {
    const response: PostgrestResponse<PostProps[]> = await supabase
      .from("post")
      .upsert([
        {
          user_id: userId,
          title: form.title,
          image: form.image,
          video: form.video,
          text: form.text,
        },
      ])
      .select("*");

    return response;
  } catch (error) {
    console.error("Error uploading post:", error);
    throw error;
  }
};

// export const upLoadFiles = async (image: any) => {
//   try {
//     const processedImage = await uploadImage(image?.uri!);

//  // get file extension and desired filename (as it will be indicated in the supabase bucket. yoiu cant have duplicates)
//   const extension = image?.uri?.substring(image?.uri.lastIndexOf(".") + 1);
//      const fileName = ` `;

//  // Upload the image
//   const { data, error }: any = await supabase.storage
//            .from(<your bucket name>)
//            .upload(fileName, processedImage.arrayBuffer, {
//              contentType: `image/${extension}`,
//              upsert: false,
// });
//   } catch (error) {
//     console.error("Error creating or making the bucket public:", error);
//   }
// };

// async function uploadFile(file: any) {

//   // Get file extension
//   const extension = file.name.split('.').pop();

//   // You can define allowed mime types here for security
//   const allowedMimeTypes = ['image/jpeg', 'image/png', 'video/mp4', 'audio/mpeg'];

//   if (!allowedMimeTypes.includes(file.type)) {
//     throw new Error('Unsupported file type');
//   }

//   // Generate unique filename with extension
//   const fileName = `${crypto.randomUUID()}.${extension}`;

//   // Upload the file
//   const { data, error } = await supabase.storage
//     .from('YOUR_BUCKET_NAME')
//     .upload(fileName, file);

//   if (error) {
//     throw error;
//   }

//   // Return the uploaded file details
//   return {
//     url: data.publicUrl,
//     filename: fileName,
//   };
// }

export async function uploadImage(uri: string) {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const arrayBuffer = await new Response(blob).arrayBuffer();
    const fileName = `public/${Date.now()}.jpg`;

    // const processedImage = await
    const extension = uri?.substring(uri.lastIndexOf(".") + 1);
    console.log(
      "arrayBuffer:",
      arrayBuffer,
      "fileName:",
      fileName,
      "extension:",
      extension
    );

    const { data, error } = await supabase.storage
      .from("images")
      .upload(fileName, arrayBuffer, {
        contentType: `image/${extension}`,
        upsert: false,
      });
    if (error) {
      console.log(error?.message);
    }
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

// Function to upload image, video, and insert post details in the database
export const upload = async (userId: any, values: PostProps) => {
  try {

    const imageFile = values?.image?.uri;
    const videoFile = values?.video?.uri;
    if (!imageFile || !videoFile) {
      console.log("Missing files");
      return { error: "Please include all files" };
    }

    // Fetch and convert image to array buffer
    const imageResponse = await fetch(imageFile);
    const imageBlob = await imageResponse.blob();
    const imageBuffer = await new Response(imageBlob).arrayBuffer();
    const imageExtension = imageFile.substring(imageFile.lastIndexOf(".") + 1);
    const imageName = `public/${Date.now()}.${imageExtension}`;

    // Fetch and convert video to array buffer
    const videoResponse = await fetch(videoFile);
    const videoBlob = await videoResponse.blob();
    const videoBuffer = await new Response(videoBlob).arrayBuffer();
    const videoExtension = videoFile.substring(videoFile.lastIndexOf(".") + 1);
    const videoName = `public/${Date.now()}.${videoExtension}`;

    console.log(
      "Image Buffer:",
      imageBuffer,
      "Video Buffer:",
      videoBuffer,
      "Image Name:",
      imageName,
      "Video Name:",
      videoName
    );

    // Upload image to Supabase storage
    const { data: imageData, error: imageError } = await supabase.storage
      .from("images")
      .upload(imageName, imageBuffer, {
        contentType: `image/${imageExtension}`,
        upsert: false,
      });

    if (imageError) {
      console.log("Image Upload Error:", imageError.message);
      return { error: imageError.message };
    }

    console.log("Image Upload Data:", imageData);

    // Upload video to Supabase storage
    const { data: videoData, error: videoError } = await supabase.storage
      .from("videos")
      .upload(videoName, videoBuffer, {
        contentType: `video/${videoExtension}`,
        upsert: false,
      });

    if (videoError) {
      console.log("Video Upload Error:", videoError.message);
      return { error: videoError.message };
    }

    console.log("Video Upload Data:", videoData);

    // Insert post details into the database
    const { data: result, error: supabaseError } = await supabase
      .from("post")
      .insert({
        user_id: userId,
        title: values.title,
        image_url: imageData.path,
        video_url: videoData.path,
        text: values.text,
      })
      .select("*");

    if (supabaseError) {
      console.log("Database Insert Error:", supabaseError.message);
      return { error: supabaseError.message };
    }

    return result;
  } catch (error: any) {
    console.log("Upload Error:", error.message);
    return { error: error.message };
  } finally {
    console.log("Upload process completed successfully");
  }
};


export const getPost = async () => {
  const { data: post, error: postError } = await supabase
    .from("post")
    .select("*");
  if (postError) {
    throw new Error(postError.message);
  }
  // console.log(post)
  return post as []
};

export const getImages = async () => {
  try {
    // List all files in the 'images' bucket
    const { data: imageList, error: listError } = await supabase.storage.from('images').list('', {
      limit: 9, // Adjust the limit as needed
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
    });

    if (listError) {
      throw new Error(listError.message);
    }

    // Generate public URLs for each file
    
    return [imageList];
  } catch (error: any) {
    console.error('Error fetching images:', error?.message);
    throw new Error(error.message);
  }
};

 interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
  [key: string]: any; // This allows for additional fields
}

interface SearchFilters {
  [key: string]: any;
}

interface Item {
  id: number;
  name: string;
  description: string;
}

// export const searchPost = async (query: string): Promise<Item[]> => {
//   try {
//     const { data, error } = await supabase
//       .from('post') // Replace 'post' with your table name
//       .select('*')
//       .ilike('title', `%${query}%`);

//     if (error) {
//       console.error('Error fetching data:', error);
//       return [];
//     }

//     return data || [];
//   } catch (error: any) {
//     if (error instanceof Error) {
//       console.error(error.message);
//     } else {
//       console.error('Unexpected error:', error);
//     }
//     return []; // Ensure a return value of type Item[] is always provided
//   }
// };
export const searchPost = async (query: string): Promise<Item[]> => {
  try {
    const { data, error } = await supabase
      .from('post') // Replace 'post' with your table name
      .select().textSearch("title", `%${query}%`, {
        type: "websearch",
        config: "english"
      })

    if (error) {
      console.error('Error fetching data:', error);
      return [];
    }

    // console.log(data)

    return data || [];
  } catch (error: any) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    return []; // Ensure a return value of type Item[] is always provided
  }
};


// Example usage (assuming SearchFilters is an interface for filter key-value pairs)
// const searchResults = await searchPost('fashion', { category: 'clothing' });

// export const getImages = async () => {
//   try {
//     // List all files in the 'images' bucket
//     const { data: imageList, error: listError } = await supabase.storage.from('images').list('', {
//       limit: 9, // Adjust the limit as needed
//       offset: 0,
//       sortBy: { column: 'name', order: 'asc' },
//     });

//     if (listError) {
//       throw new Error(listError.message);
//     }

//     // Generate public URLs for each file
//     const images = imageList.map((image) => {
//       const { data: publicURL  } = supabase.storage.from('images').getPublicUrl(image.name);
//       if (!publicURL) {
//         console.error(`Error generating public URL for ${image.name}:`);
//         return null;
//       }
//       return {
//         name: image.name,
//         url: publicURL,
//       };
//     }).filter(Boolean); // Remove any null values

//     return images;
//   } catch (error: any) {
//     console.error('Error fetching images:', error?.message);
//     throw new Error(error.message);
//   }
// };

