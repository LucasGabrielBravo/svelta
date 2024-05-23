import { env } from '$env/dynamic/public';
import Pocketbase from 'pocketbase';
import { readable } from 'svelte/store';

const { PUBLIC_SVELTA_PB_API_URL } = env

function createPB() {
  const pb = new Pocketbase(PUBLIC_SVELTA_PB_API_URL)

  return readable(pb)
}

export const pb = createPB()