import React from "react";
import styles from "./ContentManagement.module.css";
import { connect } from "react-redux";
import { Tabs, Tab, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@mui/styles";
import PrivacyPolicy from "./PrivacyPolicy/PrivacyPolicy";
import Faq from "./Faq/Faq";
import Terms from "./Terms/Terms";
import ContactUs from "./ContactUs/ContactUs";
import {
  getPrivacy,
  getPricing,
  setPrivacy,
  setTerms,
  getStory,
  getTerms,
  getAllFaq,
  getContactUs,
  getBlogs,
  getTestimonial,
} from "../../actions/contentManagement/action";
import axios from "axios";
// import { getCategory } from "../../actions/property/action";
import AddFaq from "./AddFaq/AddFaq";
import Pricing from "./Pricing/Pricing";
import Testimonial from "./Testimonial/Testimonial";
import AddTestimonial from "./Testimonial/AddTestimonial";
import ViewBlogs from "./Blogs/ViewBlogs";
import AddBlogs from "./Blogs/AddBlogs";
import { showAlert } from "../../actions/auth/action";
import Story from "./Story/Story";

const useStyles = makeStyles((theme) => ({
  tabBorder: {
    borderBottom: "solid 3px #F8CD46!important",
    color: "#F8CD46 !important",
    "&>span": {
      color: "#F8CD46 !important",
    },
  },
}));
const ContentManagement = (props) => {
  const classes = useStyles();
  const [searchVal, setSearchVal] = React.useState("");
  const [dataToUpdate, setDataToUpdate] = React.useState(false);
  const [faqPage, setFaqPage] = React.useState(1);
  const [testimonialPage, setTestimonialPage] = React.useState(1);
  const [blogPage, setBlogPage] = React.useState(1);
  const [faqSearch, setFaqSearch] = React.useState("");
  const [testimonialSearch, setTestimonialSearch] = React.useState("");
  const [blogSearch, setBlogSearch] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("Privacy");
  const [privacyForm, setPrivacyForm] = React.useState();
  const [pricingForm, setPricingForm] = React.useState();
  const [story, setStory] = React.useState({
    text: "",
    img: "",
  });
  const [termForm, setTermForm] = React.useState();

  React.useEffect(() => {
    if (!props.content.privacy && activeTab === "Privacy") {
      props.getPrivacy();
    }
    if (!props.content.blogs && activeTab === "BLOGS") {
      props.getBlogs(10, 1, "");
    }
    if (!props.content.contactus && activeTab === "Contact") {
      props.getContactUs(10, 1, "");
    }
    if (!props.content.testimonial && activeTab === "TESTIMONIAL") {
      props.getTestimonial(10, 1, "");
    }
    if (!props.content.pricing && activeTab === "Pricing") {
      props.getPricing();
    }
    if (activeTab === "Story") {
      props.getStory();
    }
    if (!props.content.term && activeTab === "Terms") {
      props.getTerms();
    }
    if (!props.content.faq && activeTab === "FAQ") {
      props.getAllFaq(10, 1, "");
      // props.getCategory();
    }
  }, [activeTab]);
  const handleChangeStory = (data) => {
    setStory({ ...story, text: data });
  };
  const handleChangeStoryImg = (data) => {
    setStory({ ...story, img: data });
  };
  const handleFaq = (page) => {
    setFaqPage(page);
    props.getAllFaq(10, page ?? faqPage, faqSearch);
  };
  const handleTestimonial = (page) => {
    setTestimonialPage(page);
    props.getTestimonial(10, page ?? testimonialPage, testimonialSearch);
  };
  const handleBlog = (page) => {
    setBlogPage(page);
    props.getBlogs(10, page ?? blogPage, blogSearch);
  };

  const handleSearch = (value) => {
    setSearchVal(value);

    if (activeTab === "TESTIMONIAL") {
      setTestimonialSearch(value);
      props.getTestimonial(10, testimonialPage, value);
    }
    if (activeTab === "BLOGS") {
      setBlogSearch(value);
      props.getBlogs(10, blogPage, value);
    }
    if (activeTab === "Contact") {
      props.getContactUs(10, 1, value);
    }
  };
  const handleState = (state, data) => {
    setActiveTab(state);
    setDataToUpdate(data);
  };
  const updateConfidential = (del, type) => {
    let storyImage = story.img ? story.img : props.content?.story?.img;
    console.log(type, storyImage, "SKDKSDJSJDKSJD");
    if (type == "STORY" && !storyImage) {
      props.showAlert(`Image field is mandatory`);
      return;
    }
    axios({
      method: "put",
      url: `/content/updateConfidential`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      data: {
        type:
          type === "Pricing"
            ? "PRICING"
            : type === "Privacy"
            ? "PRIVACY"
            : "STORY",
        text:
          type === "Pricing"
            ? pricingForm
            : type === "Privacy"
            ? privacyForm
            : story.text,
        deleted: del ? true : false,
        img: story.img ? story.img : props.content?.story?.img,
      },
    })
      .then((res) => {
        type === "Pricing" && props.getPricing();
        type === "Privacy" && props.getPrivacy();
        type === "Story" && props.getStory();

        props.showAlert(`${type} ${del ? "deleted" : "updated"} successfully`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateTerms = (del) => {
    axios({
      method: "put",
      url: `/content/updateTerms`,
      data: {
        terms: termForm,
        deleted: del ? true : false,
        // _id: props.content.term._id,
      },
    })
      .then((res) => {
        props.getTerms();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {activeTab !== "AddFaq" &&
          activeTab !== "ADD_BLOGS" &&
          activeTab !== "ADD_TESTIMONIAL" &&
          activeTab !== "EDIT_TESTIMONIAL" && (
            <>
              <div className={styles.header}>
                <div className={styles.leftHeader}>
                  {" "}
                  <div className={styles.headerTab}>
                    <Tabs
                      className={styles.tabs}
                      value={activeTab}
                      onChange={(e, val) => setActiveTab(val)}
                    >
                      <Tab
                        className={activeTab === "Privacy" && classes.tabBorder}
                        label="Privacy Policy"
                        value="Privacy"
                      />
                      <Tab
                        className={activeTab === "Pricing" && classes.tabBorder}
                        label="Pricing"
                        value="Pricing"
                      />

                      <Tab
                        className={activeTab === "Story" && classes.tabBorder}
                        label={"About us"}
                        value="Story"
                      />
                      <Tab
                        className={activeTab === "BLOGS" && classes.tabBorder}
                        label={"Blogs"}
                        value="BLOGS"
                      />
                      <Tab
                        className={activeTab === "Contact" && classes.tabBorder}
                        label={"Contact Us"}
                        value="Contact"
                      />
                      <Tab
                        className={
                          activeTab === "TESTIMONIAL" && classes.tabBorder
                        }
                        label={"Testimonials"}
                        value="TESTIMONIAL"
                      />
                    </Tabs>
                  </div>
                </div>

                <div className={styles.rightHeader}>
                  {(activeTab === "FAQ" ||
                    activeTab === "Contact" ||
                    activeTab === "BLOGS" ||
                    activeTab === "TESTIMONIAL") && (
                    <>
                      <TextField
                        fullWidth
                        sx={{ background: "white" }}
                        inputProps={{
                          style: {
                            height: "45px",
                            padding: 0,
                          },
                        }}
                        InputProps={{
                          style: {
                            color: "#B7B7B7",
                            border: "solid 1px #707070",
                            borderRadius: "10px",
                          },
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon style={{ color: "#B7B7B7" }} />
                            </InputAdornment>
                          ),
                        }}
                        placeholder="Search"
                        className={styles.search}
                        value={searchVal}
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                      {activeTab !== "Contact" && (
                        <button
                          onClick={() => {
                            activeTab === "FAQ" && setActiveTab("AddFaq");
                            activeTab === "TESTIMONIAL" &&
                              setActiveTab("ADD_TESTIMONIAL");
                            if (activeTab === "BLOGS") {
                              setActiveTab("ADD_BLOGS");
                              setDataToUpdate(false);
                            }
                          }}
                        >
                          Add New
                        </button>
                      )}
                    </>
                  )}

                  {(activeTab === "Privacy" ||
                    activeTab === "Terms" ||
                    activeTab === "Story" ||
                    activeTab === "Pricing") && (
                    <>
                      {" "}
                      <button
                        onClick={() => {
                          activeTab === "Privacy" ||
                          activeTab === "Pricing" ||
                          activeTab === "Story"
                            ? updateConfidential(false, activeTab)
                            : updateTerms();
                        }}
                      >
                        Update
                      </button>
                      <button
                        style={{
                          background: "transparent",
                          color: "black",
                          border: "black solid 1px",
                        }}
                        onClick={() => {
                          activeTab === "Privacy" ||
                          activeTab === "Pricing" ||
                          activeTab === "Story"
                            ? updateConfidential("DELETE", activeTab)
                            : updateTerms("DELETE");
                        }}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </>
          )}

        <React.Fragment>
          {activeTab === "Privacy" && (
            <>
              <PrivacyPolicy
                setPrivacyForm={setPrivacyForm}
                privacyForm={privacyForm}
                privacy={props.content.privacy && props.content.privacy}
                // // setPrivacy={props.setPrivacy}
              />
            </>
          )}
          {activeTab === "Pricing" && (
            <>
              <Pricing
                setPricingForm={setPricingForm}
                pricingForm={pricingForm}
                pricing={props.content.pricing && props.content.pricing}
                // // setPrivacy={props.setPrivacy}
              />
            </>
          )}
          {activeTab === "Story" && (
            <>
              <Story
                setStory={setStory}
                story={story}
                handleChange={handleChangeStory}
                handleChangeImg={handleChangeStoryImg}
                storyData={props.content.story && props.content.story}
              />
            </>
          )}
          {activeTab === "TESTIMONIAL" && (
            <>
              <Testimonial
                getTestimonial={props.getTestimonial}
                testimonial={props.content.testimonial}
                handleTestimonial={handleTestimonial}
                testimonialSearch={testimonialSearch}
                count={props.content.testimonialCount}
                handleState={handleState}
              />
            </>
          )}
          {activeTab === "BLOGS" && (
            <>
              <ViewBlogs
                getBlogs={props.getBlogs}
                blogs={props.content.blogs}
                showAlert={props.showAlert}
                handleBlog={handleBlog}
                blogSearch={blogSearch}
                count={props.content.blogPage}
                handleState={handleState}
              />
            </>
          )}
          {activeTab === "ADD_BLOGS" && (
            <>
              <AddBlogs
                blogs={props.content.blogs}
                showAlert={props.showAlert}
                handleBlog={handleBlog}
                blogSearch={blogSearch}
                setActiveTab={setActiveTab}
                data={dataToUpdate}
                count={props.content.blogPage}
                handleState={handleState}
              />
            </>
          )}

          {activeTab === "ADD_TESTIMONIAL" && (
            <>
              <AddTestimonial
                setActiveTab={setActiveTab}
                showAlert={props.showAlert}
                getTestimonial={props.getTestimonial}
              />
            </>
          )}
          {activeTab === "EDIT_TESTIMONIAL" && (
            <>
              <AddTestimonial
                setActiveTab={setActiveTab}
                showAlert={props.showAlert}
                data={dataToUpdate}
                getTestimonial={props.getTestimonial}
              />
            </>
          )}
          {activeTab === "Terms" && (
            <>
              <Terms
                termForm={termForm}
                setTermForm={setTermForm}
                term={props.content.term}
              />
            </>
          )}
          {activeTab === "FAQ" && (
            <>
              <Faq
                faq={props.content.faq}
                faqSearch={faqSearch}
                handleFaq={handleFaq}
                count={props.content.faqCount}
              />
            </>
          )}

          {activeTab === "Contact" && (
            <>
              <ContactUs
                contacts={props.content.contacts}
                getContactUs={props.getContactUs}
                // handleBlog={handleBlog}
                // blogSearch={blogSearch}
                count={props.content.contactsPages}
                handleState={handleState}
              />
            </>
          )}
          {activeTab === "AddFaq" && (
            <>
              <AddFaq setActiveTab={setActiveTab} getAllFaq={props.getAllFaq} />
            </>
          )}
        </React.Fragment>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  content: state.content,
});
export default connect(mapStateToProps, {
  getPrivacy,
  getPricing,
  setPrivacy,
  getTerms,
  getAllFaq,
  getBlogs,
  setTerms,
  showAlert,
  getContactUs,
  getTestimonial,
  getStory,
  // getCategory,
})(ContentManagement);
