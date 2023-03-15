import {signIn, useSession} from 'next-auth/react' 
import { useRouter } from 'next/router'
import { Button, Form } from 'semantic-ui-react';

export default function LoginPage() {

    const {data: session,status} = useSession();
    const router = useRouter();

    if(status !== 'loading' && status === 'authenticated'){
        router.push('/');
    }

    return (
        <div>
            <button onClick={() => signIn('google')}>
                Signin with Google
            </button>
        </div>
    )
}