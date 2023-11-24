// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  status: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ status: 'success' })
  // try {
  //   await res.revalidate('/');
  //   return res.status(200).json({ status: 'Success revalidating' })
  // } catch (err) {
  //   return res.status(500).json({ status: 'Error revalidating' });
  // }
}
