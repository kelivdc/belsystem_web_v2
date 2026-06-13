import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";


export const Route = createFileRoute("/")({ component: App });

type Project = {
  slug?: string;
  name?: string;
  price?: number;
  total_token?: number;
  percentage?: number;
  changes?: number;
};

const API_TOKEN = import.meta.env.VITE_API_TOKEN;
const API_URL = import.meta.env.VITE_API_URL;

const getDatas = createServerFn({ method: "GET" }).handler(async () => {
  const response = await fetch(`${API_URL}/projects?sort=urut:asc`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${API_TOKEN}`, // token from .env
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
});

function App() {
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getDatas,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>No data</div>;
  }
  const projects = data?.data || [];
  
  return (
    <div className="flex flex-col md:flex-row w-full gap-2 md:h-screen">
      <div className="w-full md:w-[40%] h-full md:flex flex-col gap-2 space-y-2 md:space-y-0">
        <Link
          to={`/detail/$slug`}
          params={{ slug: projects?.[0]?.slug || '-'}}
          className="md:h-2/3 bg-warna-0 flex items-center justify-center w-full rounded-sm flex-col gap-2 py-2"
        >
          <div className="text-xl md:text-3xl md:text-5xl font-bold">
            {projects[0]?.name || "-"}
          </div>
          <div className="text-xl md:text-3xl">
            Price: {projects[0]?.price || "-"}
          </div>
          <div className="text-xl md:text-3xl">
            {projects[0]?.price && projects?.[0]?.total_token ? (
              <>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(projects[0]?.price * projects?.[0]?.total_token)}
              </>
            ) : (
              "-"
            )}
          </div>
          <div className="text-xl md:text-3xl">
            ▲ {projects[0]?.percentage || "0"}%
          </div>
        </Link>
        <Link
          to={`/detail/$slug`}
          params={{ slug: projects[1]?.slug || '-'}}
          className="h-1/3 bg-warna-1 flex items-center justify-center w-full rounded-md flex-col gap-2"
        >
          <div className="text-xl md:text-4xl font-bold">
            {" "}
            {projects[1]?.name || "-"}
          </div>
          <div className="text-2xl">Price: {projects[1]?.price || "-"}</div>
          <div className="text-2xl">
            {projects[1]?.price && projects?.[1]?.total_token ? (
              <>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(projects[1]?.price * projects?.[1]?.total_token)}
              </>
            ) : (
              "-"
            )}
          </div>
          <div className="text-2xl">▲ {projects[1]?.changes || "0"}%</div>
        </Link>
      </div>
      <div className="md:w-[60%] h-full md:flex flex-col gap-2 justify-between">
        <div className="h-2/6 md:flex gap-2 space-y-2 md:space-y-0">
          <Link
            to={`/detail/$slug`}
            params={{ slug: projects[2]?.slug || '-'}}
            className="flex-1 bg-warna-2 flex flex-col h-full items-center justify-center w-full rounded-sm py-2"
          >
            <div className="text-xl md:text-3xl font-bold">
              {" "}
              {projects[2]?.name || "-"}
            </div>
            <div className="text-xl">Price: {projects[2]?.price || "-"}</div>
            <div className="text-xl">
              {projects[2]?.price && projects?.[2]?.total_token ? (
                <>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }).format(projects[2]?.price * projects?.[2]?.total_token)}
                </>
              ) : (
                "-"
              )}
            </div>
            <div className="text-xl">▲ {projects[2]?.changes || "0"}%</div>
          </Link>
          <Link
            to={`/detail/$slug`}
            params={{ slug: projects[3]?.slug || '-'}}
            className="flex-1 bg-warna-3 flex flex-col h-full items-center justify-center w-full rounded-sm py-2"
          >
            <div className="text-xl md:text-3xl font-bold">
              {projects[3]?.name || "-"}
            </div>
            <div className="text-xl">Price: {projects[3]?.price || "-"}</div>
            <div className="text-xl">
              {projects[3]?.price && projects?.[3]?.total_token ? (
                <>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }).format(projects[3]?.price * projects?.[3]?.total_token)}
                </>
              ) : (
                "-"
              )}
            </div>
            <div className="text-xl">▲ {projects[3]?.changes || "0"}%</div>
          </Link>
          <Link
            to={`/detail/$slug`}
            params={{ slug: projects[4]?.slug || '-'}}
            className="flex-1 bg-warna-4 flex flex-col h-full items-center justify-center w-full rounded-sm py-2"
          >
            <div className="text-xl md:text-3xl font-bold">
              {projects[4]?.name || "-"}
            </div>
            <div className="text-xl">Price: {projects[4]?.price || "-"}</div>
            <div className="text-xl">
              {projects[4]?.price && projects?.[4]?.total_token ? (
                <>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }).format(projects[4]?.price * projects?.[4]?.total_token)}
                </>
              ) : (
                "-"
              )}
            </div>
            <div className="text-xl">▲ {projects[4]?.changes || "0"}%</div>
          </Link>
        </div>
        <div className="h-3/6 gap-2 md:flex justify-between space-y-2">
          <Link
            to={`/detail/$slug`}
            params={{ slug: projects[5]?.slug || '-'}}
            className="flex-1 bg-warna-5 flex flex-col h-full items-center justify-center w-full rounded-sm mt-2 md:mt-0 py-2"
          >
            <div className="text-xl md:ext-3xl font-bold">
              {projects[5]?.name || "-"}
            </div>
            <div className="text-lg">Price: {projects[5]?.price || "-"}</div>
            <div className="text-lg">
              {projects[5]?.price && projects?.[5]?.total_token ? (
                <>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }).format(projects[5]?.price * projects?.[5]?.total_token)}
                </>
              ) : (
                "-"
              )}
            </div>
            <div className="text-lg">▲ {projects[5]?.changes || "0"}%</div>
          </Link>
          <div className="flex flex-col gap-2 flex-1 h-full justify-between">
            <Link
              to={`/detail/$slug`}
              params={{ slug: projects[6]?.slug || '-'}}
              className="flex flex-col bg-warna-6 h-full rounded-sm items-center justify-center py-2"
            >
              <div className="text-xl font-bold">
                {projects[6]?.name || "-"}
              </div>
              <div className="text-sm">Price: {projects[6]?.price || "-"}</div>
              <div className="text-sm">
                {projects[6]?.price && projects?.[6]?.total_token ? (
                  <>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    }).format(projects[6]?.price * projects?.[6]?.total_token)}
                  </>
                ) : (
                  "-"
                )}
              </div>
              <div className="text-sm">▲ {projects[6]?.changes || "0"}%</div>
            </Link>
            <Link
              to={`/detail/$slug`}
              params={{ slug: projects[7]?.slug || '-'}}
              className="flex flex-col bg-warna-7 h-full rounded-sm items-center justify-center py-2"
            >
              <div className="text-xl font-bold">
                {projects[7]?.name || "-"}
              </div>
              <div className="text-sm">Price: {projects[7]?.price || "-"}</div>
              <div className="text-sm">
                {projects[7]?.price && projects?.[7]?.total_token ? (
                  <>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    }).format(projects[7]?.price * projects?.[7]?.total_token)}
                  </>
                ) : (
                  "-"
                )}
              </div>
              <div className="text-sm">▲ {projects[7]?.changes || "0"}%</div>
            </Link>
          </div>
          <div className="flex flex-col gap-2 flex-1 h-full justify-between">
            <Link
              to={`/detail/$slug`}
              params={{ slug: projects[8]?.slug || '-'}}
              className="flex flex-col bg-warna-8 h-full rounded-sm items-center justify-center py-2"
            >
              <div className="text-xl font-bold">
                {projects[8]?.name || "-"}
              </div>
              <div className="text-sm">Price: {projects[8]?.price || "-"}</div>
              <div className="text-sm">
                {projects[8]?.price && projects?.[8]?.total_token ? (
                  <>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    }).format(projects[8]?.price * projects?.[8]?.total_token)}
                  </>
                ) : (
                  "-"
                )}
              </div>
              <div className="text-sm">▲ {projects[8]?.changes || "0"}%</div>
            </Link>
            <Link
              to={`/detail/$slug`}
              params={{ slug: projects[9]?.slug || '-'}}
              className="flex flex-col bg-warna-9 h-full rounded-sm items-center justify-center py-2"
            >
              <div className="text-xl font-bold">
                {projects[9]?.name || "-"}
              </div>
              <div className="text-sm">Price: {projects[9]?.price || "-"}</div>
              <div className="text-sm">
                {projects[9]?.price && projects?.[9]?.total_token ? (
                  <>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    }).format(projects[9]?.price * projects?.[9]?.total_token)}
                  </>
                ) : (
                  "-"
                )}
              </div>
              <div className="text-sm">▲ {projects[9]?.changes || "0"}%</div>
            </Link>
          </div>
          <div className="md:flex flex-col gap-2 flex-1 h-full justify-between space-y-2 md:space-y-0">
            <Link
              to={`/detail/$slug`}
              params={{ slug: projects[10]?.slug || '-'}}
              className="flex flex-col bg-warna-10 h-full rounded-sm items-center justify-center py-2"
            >
              <div className="text-xl font-bold">
                {projects[10]?.name || "-"}
              </div>
              <div className="text-sm">Price: {projects[10]?.price || "-"}</div>
              <div className="text-sm">
                {projects[10]?.price && projects?.[10]?.total_token ? (
                  <>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    }).format(
                      projects[10]?.price * projects?.[10]?.total_token,
                    )}
                  </>
                ) : (
                  "-"
                )}
              </div>
              <div className="text-sm">▲ {projects[10]?.changes || "0"}%</div>
            </Link>
            <Link
              to={`/detail/$slug`}
              params={{ slug: projects[11]?.slug || '-'}}
              className="flex flex-col bg-warna-11 h-full rounded-sm items-center justify-center py-2"
            >
              <div className="text-xl font-bold">
                {projects[11]?.name || "-"}
              </div>
              <div className="text-sm">Price: {projects[11]?.price || "-"}</div>
              <div className="text-sm">
                {projects[11]?.price && projects?.[11]?.total_token ? (
                  <>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    }).format(
                      projects[11]?.price * projects?.[11]?.total_token,
                    )}
                  </>
                ) : (
                  "-"
                )}
              </div>
              <div className="text-sm">▲ {projects[11]?.changes || "0"}%</div>
            </Link>
            <Link
              to={`/detail/$slug`}
              params={{ slug: projects[12]?.slug || '-'}}
              className="flex flex-col bg-warna-12 h-full rounded-sm items-center justify-center py-2"
            >
              <div className="text-xl font-bold">
                {projects[12]?.name || "-"}
              </div>
              <div className="text-sm">Price: {projects[12]?.price || "-"}</div>
              <div className="text-sm">
                {projects[12]?.price && projects?.[12]?.total_token ? (
                  <>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    }).format(
                      projects[12]?.price * projects?.[12]?.total_token,
                    )}
                  </>
                ) : (
                  "-"
                )}
              </div>
              <div className="text-sm">▲ {projects[12]?.changes || "0"}%</div>
            </Link>
          </div>
        </div>
        <div className="h-1/6 md:flex gap-2 justify-between w-full space-y-2">
          <Link
            to={`/detail/$slug`}
            params={{ slug: projects[13]?.slug || '-'}}
            className="flex flex-1 flex-col bg-warna-13 h-full rounded-sm items-center justify-center mt-2 md:mt-0 py-2"
          >
            <div className="text-normal font-bold">
              {projects[13]?.name || "-"}
            </div>
            <div className="text-sm">Price: {projects[13]?.price || "-"}</div>
            <div className="text-sm">
              {projects[13]?.price && projects?.[13]?.total_token ? (
                <>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }).format(projects[13]?.price * projects?.[13]?.total_token)}
                </>
              ) : (
                "-"
              )}
            </div>
            <div className="text-sm">▲ {projects[13]?.changes || "0"}%</div>
          </Link>
          <Link
            to={`/detail/$slug`}
            params={{ slug: projects[14]?.slug || '-'}}
            className="flex flex-1  flex-col bg-warna-14 h-full rounded-sm items-center justify-center py-2"
          >
            <div className="text-normal font-bold">
              {projects[14]?.name || "-"}
            </div>
            <div className="text-sm">Price: {projects[14]?.price || "-"}</div>
            <div className="text-sm">
              {projects[14]?.price && projects?.[14]?.total_token ? (
                <>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }).format(projects[14]?.price * projects?.[14]?.total_token)}
                </>
              ) : (
                "-"
              )}
            </div>
            <div className="text-sm">▲ {projects[14]?.changes || "0"}%</div>
          </Link>
          <Link
            to={`/detail/$slug`}
            params={{ slug: projects[15]?.slug || '-'}}
            className="flex flex-1 flex-col bg-warna-15 h-full rounded-sm items-center justify-center py-2"
          >
            <div className="text-normal font-bold">
              {projects[15]?.name || "-"}
            </div>
            <div className="text-sm">Price: {projects[15]?.price || "-"}</div>
            <div className="text-sm">
              {projects[15]?.price && projects?.[15]?.total_token ? (
                <>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }).format(projects[15]?.price * projects?.[15]?.total_token)}
                </>
              ) : (
                "-"
              )}
            </div>
            <div className="text-sm">▲ {projects[15]?.changes || "0"}%</div>
          </Link>
          <Link
            to={`/detail/$slug`}
            params={{ slug: projects[16]?.slug || '-'}}
            className="flex flex-1  flex-col bg-warna-16 h-full rounded-sm items-center justify-center py-2"
          >
            <div className="text-normal font-bold">
              {projects[16]?.name || "-"}
            </div>
            <div className="text-sm">Price: {projects[16]?.price || "-"}</div>
            <div className="text-sm">
              {projects[16]?.price && projects?.[16]?.total_token ? (
                <>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }).format(projects[16]?.price * projects?.[16]?.total_token)}
                </>
              ) : (
                "-"
              )}
            </div>
            <div className="text-sm">▲ {projects[16]?.changes || "0"}%</div>
          </Link>
          <Link
            to={`/detail/$slug`}
            params={{ slug: projects[17]?.slug || '-'}}
            className="flex flex-1  flex-col bg-warna-17 h-full rounded-sm items-center justify-center py-2"
          >
            <div className="text-normal font-bold">
              {projects[17]?.name || "-"}
            </div>
            <div className="text-sm">Price: {projects[17]?.price || "-"}</div>
            <div className="text-sm">
              {projects[17]?.price && projects?.[17]?.total_token ? (
                <>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }).format(projects[17]?.price * projects?.[17]?.total_token)}
                </>
              ) : (
                "-"
              )}
            </div>
            <div className="text-sm">▲ {projects[17]?.changes || "0"}%</div>
          </Link>
        </div>
      </div>
    </div>
  );
}