import { createResource, Match, Show, Suspense, Switch } from "solid-js";
import { Spinner, SpinnerType } from "solid-spinner";

import { api } from "~/lib/eden";

async function getProfile(userId: string) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const res = await api.auth.profile.post({ userId });

  const data = await JSON.parse(`${res.data}`);

  console.log(data);

  return data as {
    username: string;
    email: string;
    createdAt: string;
  };
}

export function UserProfile(props: { userId: string }) {
  const [profile] = createResource(props.userId, getProfile);

  return (
    <div>
      <div class="mx-auto mt-8 w-full max-w-xl rounded-lg border p-6">
        <h2 class="mb-4 text-2xl font-bold">Profile</h2>
        <Suspense
          fallback={
            <div class="mt-8 grid place-content-center">
              <Spinner type={SpinnerType.oval} />
            </div>
          }
        >
          <Switch>
            <Match when={profile.state === "errored"}>
              <div>Error: {profile.error}</div>
            </Match>
            <Match when={profile()}>
              <div class="flex flex-col space-y-4">
                <div>
                  <span class="font-bold">Username:</span>
                  <span>{profile()?.username}</span>
                </div>
                <div>
                  <span class="font-bold">Email:</span>
                  <span>{profile()?.email}</span>
                </div>
                <div>
                  <span class="font-bold">Created At:</span>
                  <span>{profile()?.createdAt}</span>
                </div>
              </div>
            </Match>
          </Switch>
        </Suspense>
      </div>
    </div>
  );
}
