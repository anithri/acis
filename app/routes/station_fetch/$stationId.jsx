import { redirect } from '@remix-run/node'

export const loader = ({ params }) => {
  console.log('params')
  redirect('/?msg=wooticus+prime')
}
