//this middleware function runs everytime route changes

import { NextResponse } from "next/server";
// import { useRouter } from "next/router";

export default function middleware(req) {
  // const router = useRouter();
  let verify = req.cookies.get("loggedIn");

  const clientURL =
    req.headers.origin ||
    req.headers.referer ||
    process.env.NEXT_PUBLIC_CLIENT_URL ||
    "";
  let url = req.url;
  if (!verify && url.includes("/account")) {
    return NextResponse.redirect(`${clientURL}/login`);
  }
  if (!verify && url.includes("/cart")) {
    return NextResponse.redirect(`${clientURL}/login`);
  }
  if (!verify && url.includes("/shipping")) {
    return NextResponse.redirect(`${clientURL}/login`);
  }
  if (!verify && url.includes("/order/")) {
    return NextResponse.redirect(`${clientURL}/login`);
  }

  if (!verify && url === `${clientURL}/my-orders`) {
    return NextResponse.redirect(`${clientURL}/login`);
  }

  if (!verify && url === `${clientURL}/order-confirm`) {
    return NextResponse.redirect(`${clientURL}/login`);
  }
  if (!verify && url === `${clientURL}/order-confirm`) {
    return NextResponse.redirect(`${clientURL}/login`);
  }
  if (!verify && url === `${clientURL}/update-password`) {
    return NextResponse.redirect(`${clientURL}/login`);
  }
  if (!verify && url === `${clientURL}/update-profile`) {
    return NextResponse.redirect(`${clientURL}/login`);
  }

  if (!verify && url === `${clientURL}/dashboard`) {
    return NextResponse.redirect(`${clientURL}/login`);
  }
}
