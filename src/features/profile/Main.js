import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./main.module.css";
import Profile from "./Profile";
import MyProfile from "./MyProfile";
import Friend from "./Friend";
import InboxDM from "./InboxDM";
import Footer from "../../Footer";
import { Grid, CircularProgress } from "@material-ui/core";
import { GoMail } from "react-icons/go";
import { BsFillPeopleFill } from "react-icons/bs";
import {
  fetchCredEnd,
  fetchCredStart,
  selectIsLoading,
} from "../auth/authSlice";
import {
  fetchAsyncGetFrameBrand,
  fetchAsyncGetFriendList,
  fetchAsyncGetInbox,
  fetchAsyncGetMyProfile,
  fetchAsyncGetProfile,
  fetchAsyncGetwheelBrand,
  fetchAsynvCreateProfile,
  selectAskList,
  selectAskListFull,
  selectInbox,
  selectProfile,
  selectProfiles,
} from "../profile/profileSlice";

const Main = () => {
  const isLoadingAuth = useSelector(selectIsLoading);
  const profile = useSelector(selectProfile);
  const profiles = useSelector(selectProfiles);
  const askList = useSelector(selectAskList);
  const askListFull = useSelector(selectAskListFull);
  const inbox = useSelector(selectInbox);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBootLoader = async () => {
      await dispatch(fetchCredStart());
      await dispatch(fetchAsynvCreateProfile());
      await dispatch(fetchAsyncGetMyProfile());
      await dispatch(fetchAsyncGetProfile());
      await dispatch(fetchAsyncGetInbox());
      await dispatch(fetchAsyncGetFrameBrand());
      await dispatch(fetchAsyncGetwheelBrand());
      await dispatch(fetchAsyncGetFriendList());
      await dispatch(fetchCredEnd());
    };
    fetchBootLoader();
  }, [dispatch]);

  const filterProfiles = profile?.id
    ? profiles.filter((prof) => {
        return prof.id !== profile.id;
      })
    : profiles;

  const listProfiles =
    filterProfiles &&
    filterProfiles.map((filprof) => (
      <Profile
        key={filprof.id}
        profileData={filprof}
        askData={askListFull.filter((ask) => {
          return (
            filprof.userPro === ask.askFrom || filprof.userPro === ask.askTo
          );
        })}
      />
    ));

  return (
    <>
      {/* {profile && ( */}
      <Grid container className="mt-60">
        <Grid item xs={12} sm={12} md={8}>
          <Grid container spacing={0}>
            <div className={styles.app_details}>
              {isLoadingAuth && (
                <CircularProgress style={{ position: "absolute" }} />
              )}
              <MyProfile />
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Grid container spacing={0}>
            <div className={styles.app_profiles}>
              <div className={styles.task_list}>{listProfiles}</div>
            </div>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={3}>
          <Grid container spacing={0}>
            <div className={styles.app_friends}>
              <h3>
                <BsFillPeopleFill className={styles.badge} />
                Friend
              </h3>
              <div className={styles.task_list}>
                {profile ? (
                  <ul>
                    {profile.id &&
                      askList.map((ask) => (
                        <Friend
                          key={ask.id}
                          ask={ask}
                          prof={profiles.filter((item) => {
                            return item.userPro === ask.askFrom;
                          })}
                        />
                      ))}
                  </ul>
                ) : (
                  <ul></ul>
                )}
              </div>
            </div>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <Grid container spacing={0} justify="center">
            <div className={styles.app_dms}>
              <h3>
                <GoMail className={styles.badge} />
                DM
              </h3>
              <div className={styles.task_list}>
                {profile ? (
                  <ul>
                    {profile.id &&
                      inbox.map((dm) => (
                        <InboxDM
                          key={dm.id}
                          dm={dm}
                          prof={profiles.filter((item) => {
                            return item.userPro === dm.sender;
                          })}
                        />
                      ))}
                  </ul>
                ) : (
                  <ul></ul>
                )}
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Grid
            container
            spacing={0}
            alignItems="center"
            justify="center"
          ></Grid>
        </Grid>
      </Grid>
      <Footer />
      {/* )} */}
    </>
  );
};

export default Main;
