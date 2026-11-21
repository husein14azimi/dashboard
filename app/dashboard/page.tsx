import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { signOutAction } from "@/app/actions";

export default async function Dashboard() {
  const session = await auth();
  if (!session?.user) redirect("/");

  const { user, google: g } = session;
  const rows: [string, string | undefined][] = [
    ["Name", user.name ?? undefined],
    ["Email", user.email ?? undefined],
    ["Email verified", g?.emailVerified === undefined ? undefined : g.emailVerified ? "Yes" : "No"],
    ["First name", g?.givenName],
    ["Last name", g?.familyName],
    ["Google account ID", g?.id],
    ["Language", g?.locale],
    ["Workspace domain", g?.workspaceDomain],
    ["Permissions granted", g?.scopes],
    ["Session expires", session.expires],
  ];

  return (
    <main>
      <div className="profile">
        {user.image && (
          // Plain <img>: avoids image-domain config; no-referrer keeps Google's CDN happy.
          <img src={user.image} alt="" referrerPolicy="no-referrer" />
        )}
        <div>
          <h1>{user.name ?? "Your dashboard"}</h1>
          <p>{user.email}</p>
        </div>
      </div>

      <dl>
        {rows.map(([label, value]) => (
          <div key={label} className="row">
            <dt>{label}</dt>
            <dd>{value ?? "Not provided"}</dd>
          </div>
        ))}
      </dl>

      <details>
        <summary>Raw session data</summary>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </details>

      <form action={signOutAction}>
        <button type="submit" className="btn">Sign out</button>
      </form>
    </main>
  );
}
