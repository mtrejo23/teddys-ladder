const PAGE_BUILDER_FIELDS = `
    _type,
    _key,
    ...select(
        _type == "heroTextBlock" => {
            title,
            studentName,
            scrollingText,
            image {
                asset->,
                alt,
                "width": asset->metadata.dimensions.width,
                "height": asset->metadata.dimensions.height
            },
            variant
        },
        _type == "heroImageBlock" => {
            title,
            studentName,
            heroImage {
                asset->,
                alt,
                "width": asset->metadata.dimensions.width,
                "height": asset->metadata.dimensions.height
            },
            image {
                asset->,
                alt,
                "width": asset->metadata.dimensions.width,
                "height": asset->metadata.dimensions.height
            },
            variant
        },
        _type == "ctaBlock" => {
            title,
            description,
            button {
                buttonText,
                linkType,
                "href": select(
                    linkType == "internal" => "/" + internalLink->slug.current,
                    linkType == "external" => externalLink
                )
            },
            image {
                asset->,
                alt,
                "width": asset->metadata.dimensions.width,
                "height": asset->metadata.dimensions.height
            },
            variant
        },
        _type == "introBlock" => {
            title,
            ages,
            description,
            color,
            variant
        },
        _type == "listBlock" => {
            title,
            description,
            button {
                buttonText,
                linkType,
                "href": select(
                    linkType == "internal" => "/" + internalLink->slug.current,
                    linkType == "external" => externalLink
                )
            },
            listGroups[] {
                "groupTitle": title,
                note,
                items[] {
                    text,
                    linkType,
                    "href": select(
                        linkType == "internal" => "/" + internalLink->slug.current,
                        linkType == "external" => externalLink,
                        linkType == "file" => file.asset->url,
                        null
                    )
                }
            }
        },
        _type == "highlightsBlock" => {
            title,
            cards[] {
                title,
                description
            }
        },
        _type == "testimonialsFullBlock" => {
            title,
            description,
            testimonials[] {
                quote,
                byline
            }
        },
        _type == "twoCardsBlock" => {
            title,
            cards[] {
                title,
                description
            }
        },
        _type == "galleryBlock" => {
            title,
            description,
            images[] {
                asset->,
                alt,
                "width": asset->metadata.dimensions.width,
                "height": asset->metadata.dimensions.height
            }
        },
        _type == "galleryScrollingImagesBlock" => {
            "title": funAndCelebrations->title,
            "description": funAndCelebrations->description,
            "slug": funAndCelebrations->slug.current,
            "images": funAndCelebrations->pageBuilder[_type == "galleryBlock"][0].images[0...4] {
                asset->,
                alt,
                "width": asset->metadata.dimensions.width,
                "height": asset->metadata.dimensions.height
            }
        },
        _type == "scheduleATourBlock" => {
            locationInfo
        },
        _type == "imageTextBlock" => {
            imagePosition,
            image {
                asset->,
                alt,
                "width": asset->metadata.dimensions.width,
                "height": asset->metadata.dimensions.height
            },
            title,
            description
        },
        _type == "teamBlock" => {
            title,
            description,
            members[] {
                image {
                    asset->,
                    alt,
                    "width": asset->metadata.dimensions.width,
                    "height": asset->metadata.dimensions.height
                },
                name,
                role,
                shortBio,
                fullBio
            }
        },
        _type == "pdfDownloadsBlock" => {
            title,
            description,
            columns,
            items[] {
                thumbnail {
                    asset->,
                    alt,
                    "width": asset->metadata.dimensions.width,
                    "height": asset->metadata.dimensions.height
                },
                itemDescription,
                "file": file.asset->url
            }
        },
        _type == "richTextBlock" => {
            title,
            content
        },
        _type == "reference" => @-> {
            "title": title,
            "blocks": block[] {
                _type,
                _key,
                ...select(
                    _type == "ctaBlock" => {
                        title,
                        description,
                        button {
                            buttonText,
                            linkType,
                            "href": select(
                                linkType == "internal" => "/" + internalLink->slug.current,
                                linkType == "external" => externalLink
                            )
                        },
                        image {
                            asset->,
                            alt,
                            "width": asset->metadata.dimensions.width,
                            "height": asset->metadata.dimensions.height
                        },
                        variant
                    },
                    _type == "pagesBlock" => {
                        title,
                        description,
                        pages[]-> {
                            _id,
                            title,
                            color,
                            ages,
                            summary,
                            "slug": slug.current
                        },
                        ctaTitle,
                        button {
                            buttonText,
                            linkType,
                            "href": select(
                                linkType == "internal" => "/" + internalLink->slug.current,
                                linkType == "external" => externalLink
                            )
                        },
                        image {
                            asset->,
                            alt,
                            "width": asset->metadata.dimensions.width,
                            "height": asset->metadata.dimensions.height
                        },
                        ctaVariant
                    },
                    _type == "programsBlock" => {
                        title,
                        description,
                        programs[]-> {
                            _id,
                            title,
                            color,
                            ages,
                            summary,
                            "slug": slug.current,
                            "pageReference": pageReference-> {
                                "slug": slug.current
                            }
                        },
                        ctaTitle,
                        button {
                            buttonText,
                            linkType,
                            "href": select(
                                linkType == "internal" => "/" + internalLink->slug.current,
                                linkType == "external" => externalLink
                            )
                        },
                        image {
                            asset->,
                            alt,
                            "width": asset->metadata.dimensions.width,
                            "height": asset->metadata.dimensions.height
                        },
                        ctaVariant
                    },
                    _type == "videoBlock" => {
                        title,
                        description,
                        vimeoUrl,
                        playVideoButton {
                            buttonText
                        },
                        button {
                            buttonText,
                            linkType,
                            "href": select(
                                linkType == "internal" => "/" + internalLink->slug.current,
                                linkType == "external" => externalLink
                            )
                        }
                    },
                    _type == "campusBlock" => {
                        title,
                        description,
                        button {
                            buttonText,
                            linkType,
                            "href": select(
                                linkType == "internal" => "/" + internalLink->slug.current,
                                linkType == "external" => externalLink
                            )
                        },
                        images[] {
                            asset->,
                            alt,
                            "width": asset->metadata.dimensions.width,
                            "height": asset->metadata.dimensions.height
                        }
                    },
                    _type == "testimonialsBlock" => {
                        title,
                        description,
                        testimonials[] {
                            testimonial,
                            byline
                        },
                        button {
                            buttonText,
                            linkType,
                            "href": select(
                                linkType == "internal" => "/" + internalLink->slug.current,
                                linkType == "external" => externalLink
                            )
                        }
                    }
                )
            }
        }
    )
`;

export const FUN_AND_CELEBRATIONS_QUERY = `*[_type == "funAndCelebrations" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    pageBuilder[] {
        ${PAGE_BUILDER_FIELDS}
    }
}`;

export const PROGRAM_QUERY = `*[_type == "program" && (slugOverride.current == $slug || (!defined(slugOverride) && slug.current == $slug))][0] {
    title,
    metaDescription,
    color,
    "pageReference": pageReference-> {
        "slug": slug.current
    },
    pageBuilder[] {
        ${PAGE_BUILDER_FIELDS}
    }
}`;

export const PAGE_QUERY = `*[_type == "page" && slug.current == $slug][0] {
    title,
    metaDescription,
    "slug": slug.current,
    pageBuilder[] {
        ${PAGE_BUILDER_FIELDS}
    }
}`;

export const HOMEPAGE_QUERY = `*[_type == "page" && slug.current == "/"][0] {
    title,
    metaDescription,
    pageBuilder[] {
        _type,
        _key,
        ...select(
            _type == "heroTextBlock" => {
                title,
                studentName,
                scrollingText,
                image {
                    asset->,
                    alt,
                    "width": asset->metadata.dimensions.width,
                    "height": asset->metadata.dimensions.height
                }
            },
            _type == "ctaBlock" => {
                title,
                description,
                button {
                    buttonText,
                    linkType,
                    "href": select(
                        linkType == "internal" => internalLink->slug.current,
                        linkType == "external" => externalLink
                    )
                },
                image {
                    asset->,
                    alt,
                    "width": asset->metadata.dimensions.width,
                    "height": asset->metadata.dimensions.height
                },
                variant
            },
            _type == "reference" => @-> {
                "title": title,
                "blocks": block[] {
                    _type,
                    _key,
                    ...select(
                        _type == "ctaBlock" => {
                            title,
                            description,
                            button {
                                buttonText,
                                "href": select(
                                    linkType == "internal" => internalLink->slug.current,
                                    linkType == "external" => externalLink
                                )
                            },
                            image {
                                asset->,
                                alt,
                                "width": asset->metadata.dimensions.width,
                                "height": asset->metadata.dimensions.height
                            },
                            variant
                        },
                        _type == "programsBlock" => {
                            title,
                            description,
                            programs[]-> {
                                _id,
                                title,
                                color,
                                ages,
                                summary,
                                "slug": slug.current,
                                "pageReference": pageReference-> {
                                    "slug": slug.current
                                }
                            },
                            ctaTitle,
                            button {
                                buttonText,
                                linkType,
                                "href": select(
                                    linkType == "internal" => "/" + internalLink->slug.current,
                                    linkType == "external" => externalLink
                                )
                            },
                            image {
                                asset->,
                                alt,
                                "width": asset->metadata.dimensions.width,
                                "height": asset->metadata.dimensions.height
                            },
                            ctaVariant
                        },
                        _type == "videoBlock" => {
                            title,
                            description,
                            vimeoUrl,
                            playVideoButton {
                                buttonText
                            },
                            button {
                                buttonText,
                                "href": select(
                                    linkType == "internal" => internalLink->slug.current,
                                    linkType == "external" => externalLink
                                )
                            }
                        },
                        _type == "campusBlock" => {
                            title,
                            description,
                            button {
                                buttonText,
                                "href": select(
                                    linkType == "internal" => internalLink->slug.current,
                                    linkType == "external" => externalLink
                                )
                            },
                            images[] {
                                asset->,
                                alt,
                                "width": asset->metadata.dimensions.width,
                                "height": asset->metadata.dimensions.height
                            }
                        },
                        _type == "testimonialsBlock" => {
                            title,
                            description,
                            testimonials[] {
                                testimonial,
                                byline
                            },
                            button {
                                buttonText,
                                "href": select(
                                    linkType == "internal" => internalLink->slug.current,
                                    linkType == "external" => externalLink
                                )
                            }
                        }
                    )
                }
            }
        )
    }
}`;
