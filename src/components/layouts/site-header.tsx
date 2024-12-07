"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useMounted } from "@/hooks/use-mounted"
import { useSearchStore } from "@/stores/search"
import { signOut } from "next-auth/react"
import { toast } from "react-hot-toast"

import { siteConfig } from "@/config/site"
import { searchShows } from "@/lib/fetchers"
import { cn } from "@/lib/utils"
import { DebouncedInput } from "@/components/debounced-input"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/layouts/main-nav"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { useProfileStore } from "@/stores/profile"
import Image from "next/image"
import { getMoviesSearchApi } from "@/lib/api/movies"

const SiteHeader = () => {
  const router = useRouter()
  const path = usePathname()
  const mounted = useMounted()
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [session, setSession] = React.useState<string>()
  const [page, setPage] = React.useState<number>(1)
  const searchStore = useSearchStore()
  const profileStore = useProfileStore()

  React.useEffect(() => {
    const session = localStorage.getItem("authToken")
    
    if (session) {
      setSession(session)
    }
  }, [setSession])
  React.useEffect(() => {
    const changeBgColor = () => {
      window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false)
    }
    window.addEventListener("scroll", changeBgColor)
    return () => window.removeEventListener("scroll", changeBgColor)
  }, [isScrolled])

  React.useEffect(() => {

  }, [searchStore.query])


  const fetchSearchShows = async (value: string) => {
    try {
      const shows = await getMoviesSearchApi(page, value)
      searchStore.setShows(shows.data?.data)
    } catch (error) {
      console.error("Failed to search shows:", error)
    }
  }

  async function searchShowsByQuery(value: string) {
    if (value !== searchStore.query) {
      setPage(1);
      searchStore.setQuery(value)
      fetchSearchShows(value);
    }
  }
  // stores


  // other profiles query
  // const otherProfilesQuery = profileStore.profile
  //   ? api.profile.getOthers.useQuery(profileStore.profile.id, {
  //       enabled: !!session?.user && !!profileStore.profile,
  //     })
  //   : null

  const logOut = async () => {
    profileStore.setChooseProfile(false);
    localStorage.removeItem("authToken");
    setSession('')
    await router.push("/login")
    signOut()
  }

  return (
    <header
      aria-label="Header"
      className={cn(
        "sticky top-0 z-40 w-full",
        isScrolled ? "bg-neutral-900 shadow-md" : "bg-transparent"
      )}
    >
      <nav className="container flex h-16 max-w-screen-2xl items-center justify-between space-x-4 sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex items-center space-x-1.5">
          {mounted ? (
            <DebouncedInput
              containerClassName={cn(
                path === "/login" || path === "/login/plans" ? "hidden" : "flex"
              )}
              setQuery={searchStore.setQuery}
              setData={searchStore.setShows}
              value={searchStore.query}
              onChange={(value) => void searchShowsByQuery(value.toString())}
            />
          ) : (
            <Skeleton className="aspect-square h-7 bg-neutral-700" />
          )}
          {mounted && session && (
            <Button
              aria-label="Notifications"
              variant="ghost"
              className="hidden h-auto rounded-full p-1 hover:bg-transparent dark:hover:bg-transparent lg:flex"
              onClick={() =>
                toast.success("Do a kickflip", {
                  icon: "🛹",
                })
              }
            >
              <Icons.bell
                className="h-5 w-5 cursor-pointer text-white transition-opacity hover:opacity-75 active:scale-95"
                aria-hidden="true"
              />
            </Button>
            
          )}
          {mounted && session && (
            <Button
              aria-label="Notifications"
              variant="ghost"
              className="hidden h-auto rounded-full p-1 hover:bg-transparent dark:hover:bg-transparent lg:flex"
                onClick={() =>
                  profileStore.setChooseProfile(false)
                }
            >
              <Icons.refresh className="h-5 w-5 text-white" />
            </Button>
            
          )}
          {mounted ? (
            session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    aria-label="Account menu trigger"
                    variant="ghost"
                    className="h-auto shrink-0 px-2 py-1.5 text-base hover:bg-transparent focus:ring-0 hover:dark:bg-neutral-800 [&[data-state=open]>svg]:rotate-180"
                  >
                    <div className="flex gap-4 items-center">
                      <Image
                        src={profileStore.activeProfile?.avatar ?? "/images/Netfli5.png"}
                        alt="Profile"
                        width={22}
                        height={22}
                        className="rounded"
                      />
                    </div>
                    <Icons.chevronDown className="ml-2 hidden h-4 w-4 transition-transform duration-200 lg:inline-block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  sideOffset={20}
                  className="w-52 overflow-y-auto overflow-x-hidden rounded-sm bg-neutral-800/90 text-slate-200 dark:bg-neutral-800/90 dark:text-slate-200"
                >
                  {siteConfig.profileDropdownItems.map(
                    (item, index) =>
                      item.title !== "Sign Out of Netflix" &&
                      (item.href ? (
                        <DropdownMenuItem
                          key={index}
                          asChild
                          className="hover:bg-neutral-700 focus:bg-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 cursor-pointer"
                        >
                          <Link href={item.href}>
                            {item.icon && (
                              <item.icon
                                className="mr-3 h-4 w-4 text-slate-400"
                                aria-hidden="true"
                              />
                            )}
                            <span className="line-clamp-1">{item.title}</span>
                          </Link>
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          key={index}
                          asChild
                          className="hover:bg-neutral-700 focus:bg-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 cursor-pointer"
                        >
                          <span onClick={item.onClick}>
                            {item.icon && (
                              <item.icon
                                className="mr-3 h-4 w-4 text-slate-400"
                                aria-hidden="true"
                              />
                            )}
                            <span className="line-clamp-1">{item.title}</span>
                          </span>
                        </DropdownMenuItem>
                      ))
                  )}
                  <DropdownMenuSeparator />
                  {siteConfig.profileDropdownItems.map(
                    (item, index) =>
                      item.title === "Sign Out of Netflix" && (
                        <DropdownMenuItem
                          key={index}
                          asChild
                          className="hover:bg-neutral-700 focus:bg-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 cursor-pointer"
                        >
                          <span
                            className="line-clamp-1 grid place-items-center"
                            onClick={logOut}
                          >
                            {item.title}
                          </span>
                        </DropdownMenuItem>
                      )
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                aria-label="Sign in"
                href="/login"
                className={cn(
                  buttonVariants({
                    variant: "brand",
                    size: "auto",
                    className: "h-auto rounded",
                  })
                )}
              >
                Sign In
              </Link>
            )
          ) : (
            <Skeleton className="h-7 w-10 bg-neutral-700" />
          )}
        </div>
      </nav>
    </header>
  )
}

export default SiteHeader
