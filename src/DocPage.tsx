import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { GlobalProvider } from "./docs/default/getting-started/GlobalProvider";
import { Introduction } from "./docs/default/getting-started/Introduction";
import { NewProject } from "./docs/default/getting-started/NewProject";
import { BuildingIdentifiers } from "./docs/default/identifiers/BuildingIdentifiers";
import { SearchingByIdentifier } from "./docs/default/identifiers/SearchingByIdentifier";
import { AddingToAList } from "./docs/default/lists/AddingToAList";
import { DisplayingAList } from "./docs/default/lists/DisplayingAList";
import { IntroductionToLists } from "./docs/default/lists/IntroductionToLists";
import { RemovingFromAList } from "./docs/default/lists/RemovingFromAList";
import { UpdatingAList } from "./docs/default/lists/UpdatingAList";
import { DeletingData } from "./docs/default/publishes/DeletingData";
import { FetchingData } from "./docs/default/publishes/FetchingData";
import { UpdatingData } from "./docs/default/publishes/UpdatingData";
import { Authentication } from "./docs/default/user-info/Authentication";
import { Balance } from "./docs/default/user-info/Balance";
import { DataTransformation } from "./docs/default/utils/DataTransformation";

export function DocPage() {
  const { pageId } = useParams();

  switch (pageId) {
    case "getting-started-introduction":
      return <Introduction />;

    case "getting-started-starting-a-new-project":
      return <NewProject />;
    case "getting-started-globalprovider-config":
      return <GlobalProvider />;
    case "user-info-authentication":
      return <Authentication />;
    case "user-info-qort-balance":
      return <Balance />;
    case "lists-introduction-to-lists":
      return <IntroductionToLists />;
    case "lists-displaying-a-list":
      return <DisplayingAList />;
    case "lists-adding-to-a-list":
      return <AddingToAList />;
    case "lists-updating-a-list":
      return <UpdatingAList />;
    case "lists-removing-from-a-list":
      return <RemovingFromAList />;
    case "publishes-fetching-data":
      return <FetchingData />;
    case "publishes-cache-published-data":
      return <UpdatingData />;
    case "publishes-deleting-data":
      return <DeletingData />;
    case "identifiers-building-identifiers":
      return <BuildingIdentifiers />;
    case "identifiers-searching-by-identifier":
      return <SearchingByIdentifier />;
    case "utils-data-transformation":
      return <DataTransformation />;
    default:
      return <Typography color="error">Page "{pageId}" not found.</Typography>;
  }
}