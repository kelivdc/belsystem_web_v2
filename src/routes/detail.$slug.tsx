import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { IconBrandTelegram } from "@tabler/icons-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  createFileRoute,
  Link,
  notFound,
  useLoaderData,
} from "@tanstack/react-router";
import {
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
  TrendingUp,
  Youtube,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { getProject } from "@/server/project";

export const Route = createFileRoute("/detail/$slug")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const result = await getProject({ data: { slug: params.slug } } as any);
    if (!result) {
      throw notFound();
    }
    return result;
  },
  head: ({ loaderData, params }) => ({
    meta: [
      {
        title: loaderData?.data?.[0]?.name,
      },
    ],
  }),
  notFoundComponent: () => (
    <div className="text-center w-full">- Data not found -</div>
  ),
});

const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

function RouteComponent() {
  const loader = useLoaderData({ from: "/detail/$slug" });
  const project = loader?.data || [];
  let market_cap = 0;
  if (project[0]?.price && project[0]?.total_token) {
    market_cap = project[0]?.price * project[0]?.total_token;
  }
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Belsystem</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{project[0]?.name || "-"}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="md:flex gap-8 py-4 justify-between">
        <div className="w-full md:w-[75%]">
          <div className="border rounded-sm p-6 dark:bg-neutral-800 md:flex justify-between gap-4 w-full">
            <div className="w-full md:w-[80%]">
              <div>
                <div className="text-3xl font-bold flex items-center gap-4">
                  {project[0]?.name || "-"}
                  <Badge
                    className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums p-2"
                    variant="outline"
                  >
                    {project[0]?.short || "-"}
                  </Badge>
                </div>
                <div className="py-2">
                  {project[0]?.about?.[0]?.children?.[0]?.text || "-"}
                </div>
                <div className="border p-2 break-words">
                  <div>Contact Address</div>
                  <div>{project[0]?.contact_address || "-"}</div>
                </div>
              </div>
            </div>
            <div className="md:w-[20%] md:flex items-center text-center justify-center pt-4 md:pt-0">
              {project[0]?.logo?.url ? (
                <img
                  src={`${IMAGE_URL}${project[0].logo.url}`}
                  alt="Logo"
                  width={200}
                  height={200}
                />
              ) : (
                "-"
              )}
            </div>
          </div>
          <div className="md:flex justify-between gap-4 w-full py-4 space-y-4 md:space-y-0">
            <Card className="flex-1 dark:bg-neutral-800 ">
              <CardContent className="flex items-center min-h-[120px]">
                <div className="gap-2 flex flex-col">
                  <div>Market Cap</div>
                  <div className="text-3xl font-semibold">
                    {market_cap > 0
                      ? new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          maximumFractionDigits: 0, // biar tanpa koma desimal
                        }).format(market_cap)
                      : "-"}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="flex-1 dark:bg-neutral-800 ">
              <CardContent className="flex items-center min-h-[120px]">
                <div className="gap-2 flex flex-col">
                  <div>Net Income</div>
                  <div className="text-3xl font-semibold text-gray-800 dark:text-white">
                    {project[0]?.total_net_income
                      ? new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          maximumFractionDigits: 0, // biar tanpa koma desimal
                        }).format(project[0].total_net_income)
                      : "-"}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="flex-1 dark:bg-neutral-800 ">
              <CardContent className="flex items-center min-h-[120px]">
                <div className="gap-2 flex flex-col">
                  <div>Revenue</div>
                  <div className="text-3xl font-semibold text-gray-800  dark:text-white">
                    {project[0]?.total_revenue
                      ? new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          maximumFractionDigits: 0, // biar tanpa koma desimal
                        }).format(project[0].total_revenue)
                      : "-"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="md:flex gap-4 py-4 justify-between space-y-4 md:space-y-0">
            <Card className="w-full dark:bg-neutral-800 ">
              <CardContent className="py-4 flex flex-col gap-2">
                <div>Debt</div>
                <div className="text-2xl font-bold">
                  {project[0]?.debt
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0, // biar tanpa koma desimal
                      }).format(project[0].debt)
                    : "-"}
                </div>
                <div className="text-xs text-gray-500 w-full flex gap-2">
                  <TrendingUp className="text-white font-bold" size={16} />
                  {project[0]?.debt_persen
                    ? `${new Intl.NumberFormat("en-US").format(
                        project[0]?.debt_persen,
                      )}%`
                    : "-"}{" "}
                  (YoY)
                </div>
              </CardContent>
            </Card>
            <Card className="w-full dark:bg-neutral-800 ">
              <CardContent className="py-4 flex flex-col gap-2">
                <div>Minority Interest</div>
                <div className="text-2xl font-bold">
                  {project[0]?.minority
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0, // biar tanpa koma desimal
                      }).format(project[0].minority)
                    : "-"}
                </div>
                <div className="text-xs text-gray-500 w-full flex gap-2">
                  <TrendingUp className="text-white font-bold" size={16} />
                  {project[0]?.minority_persen
                    ? `${new Intl.NumberFormat("en-US").format(
                        project[0]?.minority_persen,
                      )}%`
                    : "-"}{" "}
                  (YoY)
                </div>
              </CardContent>
            </Card>
            <Card className="w-full dark:bg-neutral-800 ">
              <CardContent className="py-4 flex flex-col gap-2">
                <div>Cash & Equivalent</div>
                <div className="text-2xl font-bold">
                  {project[0]?.equivalent
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0, // biar tanpa koma desimal
                      }).format(project[0].equivalent)
                    : "-"}
                </div>
                <div className="text-xs text-gray-500 w-full flex gap-2">
                  <TrendingUp className="text-white font-bold" size={16} />
                  {project[0]?.equivalent_persen
                    ? `${new Intl.NumberFormat("en-US").format(
                        project[0]?.equivalent_persen,
                      )}%`
                    : "-"}{" "}
                  (YoY)
                </div>
              </CardContent>
            </Card>
            <Card className="w-full dark:bg-neutral-800 ">
              <CardContent className="py-4 flex flex-col gap-2">
                <div>Enterprise Value</div>
                <div className="text-2xl font-bold">
                  {" "}
                  {project[0]?.enterprise
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0, // biar tanpa koma desimal
                      }).format(project[0].enterprise)
                    : "-"}
                </div>
                <div className="text-xs text-gray-500 w-full flex gap-2">
                  <TrendingUp className="text-white font-bold" size={16} />{" "}
                  {project[0]?.enterprise_persen
                    ? `${new Intl.NumberFormat("en-US").format(
                        project[0]?.enterprise_persen,
                      )}%`
                    : "-"}{" "}
                  (YoY)
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="w-full dark:bg-neutral-800 mt-4 py-4">
            <CardContent>
              <h2>Income Statement</h2>
              <div className="text-md text-gray-500 pb-4">
                Updated {format(new Date(project[0].updatedAt), "MMMM d, yyyy")}
              </div>
              {project[0]?.income_statement?.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="font-bold">
                      <TableHead>Year</TableHead>
                      <TableHead>Expenses</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Profit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="dark:text-gray-400">
                    {project[0]?.income_statement?.length > 0
                      ? project[0].income_statement.map((dt: any) => (
                          <TableRow key={dt.id}>
                            <TableCell>{dt.tahun || "-"}</TableCell>
                            <TableCell>
                              {dt.expenses > 0
                                ? new Intl.NumberFormat("en-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                    maximumFractionDigits: 0, // biar tanpa koma desimal
                                  }).format(dt.expenses)
                                : "-"}
                            </TableCell>
                            <TableCell>
                              {dt.revenue > 0
                                ? new Intl.NumberFormat("en-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                    maximumFractionDigits: 0, // biar tanpa koma desimal
                                  }).format(dt.revenue)
                                : "-"}
                            </TableCell>
                            <TableCell>
                              {dt.profit > 0
                                ? new Intl.NumberFormat("en-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                    maximumFractionDigits: 0, // biar tanpa koma desimal
                                  }).format(dt.profit)
                                : "-"}
                            </TableCell>
                          </TableRow>
                        ))
                      : "- No Expense Data Found -"}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-4 text-sm text-muted-foreground">
                  - No Expenses Data Found -
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="w-full md:w-[25%]">
          <Card className="dark:bg-neutral-800">
            <CardContent className="text-xs">
              <div className="font-bold py-4 text-2xl">Company Profile</div>
              <div className="flex gap-4 py-2 justify-between">
                <div className="text-gray-400">Thicker Code</div>
                <div>{project[0]?.thicker_code || "-"}</div>
              </div>
              <div className="flex gap-4 py-2 justify-between">
                <div className="text-gray-400">Company Name</div>
                <div>{project[0]?.company_name || "-"}</div>
              </div>
              <div className="flex gap-4 py-2 justify-between">
                <div className="text-gray-400">Market Cap</div>
                <div>
                  {market_cap > 0
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0, // biar tanpa koma desimal
                      }).format(market_cap)
                    : "-"}
                </div>
              </div>
              <div className="flex gap-4 py-2 justify-between">
                <div className="text-gray-400">Price</div>
                <div>{project[0]?.price ? "$" + project[0]?.price : "-"}</div>
              </div>
              <div className="flex gap-4 py-2 justify-between">
                <div className="text-gray-400">Total Token</div>
                <div>
                  {project[0]?.total_token
                    ? new Intl.NumberFormat("en-US").format(
                        project[0]?.total_token,
                      )
                    : "-"}
                </div>
              </div>
              <div className="flex gap-4 py-2 justify-between">
                <div className="text-gray-400">Employees</div>
                <div>{project[0]?.employees || "-"}</div>
              </div>
              <div className="flex gap-4 py-2 justify-between">
                <div className="text-gray-400">Founded</div>
                <div>{project[0]?.founded || "-"}</div>
              </div>
              <div className="flex gap-4 py-2 justify-between">
                <div className="text-gray-400">Founder</div>
                <div>{project[0]?.founder || "-"}</div>
              </div>
              <div className="flex gap-4 py-2 justify-between">
                <div className="text-gray-400">CEO</div>
                <div>{project[0]?.ceo || "-"}</div>
              </div>
              <div className="flex gap-4 py-2 justify-between">
                <div className="text-gray-400">Website</div>
                <div className="flex gap-1">
                  {project[0]?.website ? (
                    <>
                      <a
                        href={project[0]?.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:underline whitespace-nowrap"
                      >
                        {project[0]?.website}
                        <ExternalLink size={14} />
                      </a>
                    </>
                  ) : (
                    "-"
                  )}
                </div>
              </div>
              <div className="py-2">
                <Separator />
              </div>
              <div className="flex flex-col">
                <div className="font-bold py-2">Ownership</div>
                {project[0]?.ownership && project[0].ownership.length > 0 ? (
                  project[0].ownership.map((item: any) => (
                    <div
                      className="flex gap-4 py-2 justify-between"
                      key={item.id}
                    >
                      <div className="text-gray-400">
                        {item.owner_name || "-"}
                      </div>
                      <div className="flex gap-1">
                        {item.percentage || "-"}%
                      </div>
                    </div>
                  ))
                ) : (
                  <div>-</div>
                )}
              </div>
              <div className="py-2">
                <Separator />
              </div>
              <div className="flex flex-col">
                <div className="font-bold py-2">Social Media</div>
                <div className="flex gap-4 py-2 justify-between">
                  <div className="text-gray-400">Instagram</div>
                  <div className="flex gap-1">
                    {project[0]?.social?.instagram ? (
                      <>
                        <a
                          href={
                            `https://instagram.com/` +
                            project[0]?.social?.instagram
                          }
                          className="flex items-center gap-1 hover:underline whitespace-nowrap"
                          target="_blank"
                        >
                          <Instagram size={14} />
                          {project[0]?.social?.instagram}
                        </a>
                      </>
                    ) : (
                      "-"
                    )}
                  </div>
                </div>
                <div className="flex gap-4 py-2 justify-between">
                  <div className="text-gray-400">X (Twitter)</div>
                  <div className="flex gap-1">
                    {project[0]?.social?.twitter ? (
                      <>
                        <a
                          href={`https://x.com/` + project[0]?.social?.twitter}
                          className="flex items-center gap-1 hover:underline whitespace-nowrap"
                          target="_blank"
                        >
                          <img
                            alt="X"
                            src="/icons8-x.svg"
                            width={14}
                            height={14}
                          />{" "}
                          {project[0]?.social?.twitter}
                        </a>
                      </>
                    ) : (
                      "-"
                    )}
                  </div>
                </div>
                <div className="flex gap-4 py-2 justify-between">
                  <div className="text-gray-400">Tiktok</div>
                  <div className="flex gap-1">
                    {project[0]?.social?.tiktok ? (
                      <>
                        <a
                          href={
                            `https://tiktok.com/` + project[0]?.social?.tiktok
                          }
                          className="flex items-center gap-1 hover:underline whitespace-nowrap"
                          target="_blank"
                        >
                          <img
                            alt="TikTok"
                            src="/icons8-tiktok.svg"
                            width={20}
                            height={20}
                          />{" "}
                          {project[0]?.social?.tiktok}
                        </a>
                      </>
                    ) : (
                      "-"
                    )}
                  </div>
                </div>
                <div className="flex gap-4 py-2 justify-between">
                  <div className="text-gray-400">Youtube</div>
                  <div className="flex gap-1">
                    {project[0]?.social?.youtube ? (
                      <>
                        <a
                          href={
                            `https://youtube.com/` + project[0]?.social?.youtube
                          }
                          className="flex items-center gap-1 hover:underline whitespace-nowrap"
                          target="_blank"
                        >
                          <Youtube size={14} />
                          {project[0]?.social?.youtube}
                        </a>
                      </>
                    ) : (
                      "-"
                    )}
                  </div>
                </div>
                <div className="flex gap-4 py-2 justify-between">
                  <div className="text-gray-400">Facebook</div>
                  <div className="flex gap-1">
                    {project[0]?.social?.facebook ? (
                      <>
                        <a
                          href={
                            `https://facebook.com/` +
                            project[0]?.social?.facebook
                          }
                          className="flex items-center gap-1 hover:underline whitespace-nowrap"
                          target="_blank"
                        >
                          <Facebook size={14} />
                          {project[0]?.social?.facebook}
                        </a>
                      </>
                    ) : (
                      "-"
                    )}
                  </div>
                </div>
                <div className="flex gap-4 py-2 justify-between">
                  <div className="text-gray-400">Telegram</div>
                  <div className="flex gap-1">
                    {project[0]?.social?.telegram ? (
                      <>
                        <a
                          href={`https://t.me/` + project[0]?.social?.telegram}
                          className="flex items-center gap-1 hover:underline whitespace-nowrap"
                          target="_blank"
                        >
                          <IconBrandTelegram size={14} />
                          {project[0]?.social?.telegram}
                        </a>
                      </>
                    ) : (
                      "-"
                    )}
                  </div>
                </div>
                <div className="flex gap-4 py-2 justify-between">
                  <div className="text-gray-400">LinkedIn</div>
                  <div className="flex gap-1">
                    {project[0]?.social?.linkedin ? (
                      <>
                        <a
                          href={
                            `https://linkedin.com/company/` +
                            project[0]?.social?.linkedin
                          }
                          className="flex items-center gap-1 hover:underline whitespace-nowrap"
                          target="_blank"
                        >
                          <Linkedin size={14} />
                          {project[0]?.social?.linkedin}
                        </a>
                      </>
                    ) : (
                      "-"
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t text-xs py-2">
              Updated {format(new Date(project[0].updatedAt), "MMMM d, yyyy")}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}