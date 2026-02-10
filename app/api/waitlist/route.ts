import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function POST(req: NextRequest) {
  try {
    const supabase = getSupabase();
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "無効なメールアドレスです" }, { status: 400 });
    }

    const { error } = await supabase.from("waitlist").insert({ email });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ error: "このメールアドレスは既に登録済みです" }, { status: 409 });
      }
      return NextResponse.json({ error: "登録に失敗しました" }, { status: 500 });
    }

    const { count } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    return NextResponse.json({ success: true, position: count ?? 0 });
  } catch {
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}