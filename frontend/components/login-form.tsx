'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Link from "next/link"
import { useRouter } from "next/navigation"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const router = useRouter()

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Microsoft or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>

          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <Button variant="outline" className="w-full cursor-pointer" onClick={() => {
                //login.microsoftonline.com
                window.location.href = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?
                                          client_id=${process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID}
                                          &response_type=code
                                          &response_mode=query
                                          &prompt=consent
                                          &redirect_uri=${process.env.NEXT_PUBLIC_MICROSOFT_REDIRECT_URI}
                                          &scope=openid profile email User.Read offline_access Directory.Read.All Mail.Read Mail.ReadWrite Directory.Read.All MailboxSettings.Read User.ReadBasic.All
                                          &consent=true`
              }}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H11.5V11.5H4V4ZM12.5 4H20V11.5H12.5V4ZM4 12.5H11.5V20H4V12.5ZM12.5 12.5H20V20H12.5V12.5Z" fill="currentColor" />
                </svg>
                Login with Microsoft
              </Button>
              <Button variant="outline" className="w-full cursor-pointer" onClick={() => {
                //login.google.com
                window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?
                                          client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
                                          &response_type=code
                                          &redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}
                                          &scope=openid profile email`
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Login with Google
              </Button>
            </div>

            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href={"/auth/signup"} className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </div>

        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
