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
import { HomePage } from "./home"
import { AboutPage } from "./about";
import { UserPage } from "./user";
import { UsersPage } from "./users";
import { OldPage } from "./old"

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

export const pages: PagesInterface = [
  {
    path: path.home,
    element: <HomePage />
  },
  {
    path: path.about,
    element: <AboutPage />
    },
  {
    path: path.users,
    element: <UsersPage />
    },
  {
    path: path.user.plain,
    element: <UserPage />
    },
  {
    path: path.old,
    element: <OldPage />
  }
]
