import React from "react"
import { withLayout } from "../components/layout"
import { useBackground } from "../context/background"
import { LoadingIndicator } from "../components/loading-indicator"
import DeleteIcon from "@material-ui/icons/Delete"
import IconButton from "@material-ui/core/IconButton"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Paper from "@material-ui/core/Paper"
import { Typography } from "@material-ui/core"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import { useCallAsync } from "../utils/notifications"

const AuthorizedWebsitesPageBase: React.FC = () => {
  const { popupState, request } = useBackground()

  if (!popupState) {
    return <LoadingIndicator />
  }

  const origins = popupState.authorizedOrigins || []
  if (origins.length === 0) {
    return null
  }

  const DeleteWebsite = (origin: string) => {
    const callAsync = useCallAsync()
    console.log("delete item:", origin)
    callAsync(
      request("popup_deleteAuthorizedWebsite", {
        origin: origin,
      }),
      {
        progressMessage: "Deleting website...",
        successMessage: "Success!",
      }
    )
  }

  return (
    <>
      <Container fixed maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper>
              <AppBar position="static" color="default" elevation={1}>
                <Toolbar>
                  <Typography variant="h6" style={{ flexGrow: 1 }} component="h2">
                    List of authorized websites
                  </Typography>
                </Toolbar>
              </AppBar>
              <List disablePadding>
                {origins.map((origin: string) => (
                  <ListItem>
                    <ListItemText primary={origin} />
                    <IconButton onClick={() => DeleteWebsite(origin)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export const AuthorizedWebsitesPage = withLayout(AuthorizedWebsitesPageBase)
