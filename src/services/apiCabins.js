import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be loaded");
  }
  return data;
}

// export async function createEditCabins(newCabins, id) {
//   const hasImagePath = newCabins.image?.startsWith?.(supabaseUrl);

//   const imageName = `${Math.random()}-${newCabins.image.name}`.replaceAll(
//     "/",
//     ""
//   );
//   const imagePath = hasImagePath
//     ? newCabins.image
//     : `${supabaseUrl}/storage/v1/object/public/cabin-image/${imageName}`;

//   let query = supabase.from("cabins");
//   console.log(query);

//   //   Create
//   if (!id) query = query.insert([{ ...newCabins, image: imagePath }]);

//   const { data, error } = await query.select().single();

//   //   Edit
//   if (id)
//     query = query
//       .update({ ...newCabins, image: imagePath })
//       .eq("id", id)
//       .select();

//   if (error) {
//     console.error(error);
//     throw new Error("Cabin could not be created");
//   }
//   if (hasImagePath) return;
//   const { error: storageError } = await supabase.storage
//     .from("cabin-images")
//     .upload(imageName, newCabins.image);

//   if (storageError) {
//     await supabase.from("cabins").delete().eq("id", data.id);
//     console.error(storageError);
//     throw new Error("cabin could not be created and no image uploaded");
//   }
//   return data;
// }

export async function createEditCabins(newCabins, id) {
  const hasImagePath = newCabins.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabins.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabins.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/edit cabin
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabins, image: imagePath }]);

  // B) EDIT
  if (id) query = query.update({ ...newCabins, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabins.image);

  // 3. Delete the cabin IF there was an error uplaoding image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabins(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
