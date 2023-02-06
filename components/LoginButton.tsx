import { useSession, signIn, signOut } from "next-auth/react"

const LoginButton = (): JSX.Element => {
  const { data: session } = useSession()
  // console.log("Session:", session)

  if (session) {
    return (
      <>
        {session.user && session.user.email
        ? 'Signed in as ' + session.user.email
        : ''
        }
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <div className="gap-0">
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  )
}

export default LoginButton