/**
 * MIT License
 * 
 * Copyright (c) 2022 Amin NAIRI
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { PagesInterface } from "../sources";
import { Loading } from "../components/loading"
import { lazy } from "preact/compat"

export const path = {
  home: "/",
  about: "/about",
  users: "/users",
  old: "/old",
  user: {
    plain: "/user/:user",
    computed(parameters: Record<string, string> = {}) {
      return Object.entries(parameters).reduce((computedPath, [parameterName, parameterValue]) => {
        return computedPath.replace(`:${parameterName}`, parameterValue)
      }, this.plain)
    }
  }
}

const HomePage = lazy(() => import("./home"))
const AboutPage = lazy(() => import("./about"))
const UsersPage = lazy(() => import("./users"))
const UserPage = lazy(() => import("./user"))
const OldPage = lazy(() => import("./old"))

export const pages: PagesInterface = [
  {
    path: path.home,
    title: () => "Home",
    description: () => "Home page description",
    metas: [],
    element: <HomePage />
  },
  {
    path: path.about,
    title: () => "About",
    description: () => "About page description",
    metas: [],
    element: <AboutPage />
    },
  {
    path: path.users,
    title: () => "Users",
    description: () => "Users page description",
    metas: [],
    element: <UsersPage />
    },
  {
    path: path.user.plain,
    title: (parameters) => `User#${parameters.user}`,
    description: (parameters) => `User#${parameters.user} details page description`,
    metas: [],
    element: <UserPage />
  },
  {
    path: path.old,
    title: () => "Old",
    description: () => "Old page description",
    metas: [],
    element: <OldPage />
  }
]
