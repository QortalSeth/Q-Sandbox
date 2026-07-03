import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App";
import { DocPage } from "./DocPage";
import { Framework } from "./Framework";
import { QortalRequests } from "./QortalRequests";
import { Tutorials } from "./Tutorials";

const baseUrl = (window as any)?._qdnBase || "";

export function Routes() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <App />,
        children: [
          {
            index: true,
            element: <QortalRequests />,
          },
          {
            path: "/framework/:frameworkName",
            element: <Framework />, // Wrapper component
            children: [
              {
                index: true, // /framework/:frameworkName
                element: <DocPage />,
              },
              {
                path: ":pageId", // /framework/:frameworkName/:pageId
                element: <DocPage />,
              },
            ],
          },
          {
            path: "/tutorials",
            element: <Tutorials />, // Wrapper component
          },
        ],
      },
    ],
    {
      basename: baseUrl,
    },
  );

  return <RouterProvider router={router} />;
}