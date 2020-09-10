// Manual checks abridged wcag obj


export interface ManualCheckInfo {
    num: string;
    level: string;
    title: string;
    url: string;
}


export const manualCheckObj: ManualCheckInfo[] = [
    {
        "num": "1.2.1",
        "level": "A",
        "title": "For prerecorded audio-only and prerecorded video-only media, the following are true, except when the audio or video is a media alternative for text and is clearly labeled as such:",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/audio-only-and-video-only-prerecorded",
    },
    {
        "num": "1.2.2",
        "level": "A",
        "title": "Captions are provided for all prerecorded audio content in synchronized media, except when the media is a media alternative for text and is clearly labeled as such.",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/captions-prerecorded",
    },
    {
        "num": "1.2.3",
        "level": "A",
        "title": "An alternative for time-based media or audio description of the prerecorded video content is provided for synchronized media, except when the media is a media alternative for text and is clearly labeled as such.",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/audio-description-or-media-alternative-prerecorded",
    },
    {
        "num": "1.3.2",
        "level": "A",
        "title": "When the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined.",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/meaningful-sequence",
    },
    {
        "num": "1.3.3",
        "level": "A",
        "title": "Instructions provided for understanding and operating content do not rely solely on sensory characteristics of components such as shape, color, size, visual location, orientation, or sound.",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/sensory-characteristics",
    },
    {
        "num": "2.1.2",
        "level": "A",
        "title": "If keyboard focus can be moved to a component of the page using a keyboard interface, then focus can be moved away from that component using only a keyboard interface, and, if it requires more than unmodified arrow or tab keys or other standard exit methods, the user is advised of the method for moving focus away.",        
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/no-keyboard-trap",
    },
    {
        "num": "2.1.4",
        "level": "A",
        "title": "If a keyboard shortcut is implemented in content using only letter (including upper- and lower-case letters), punctuation, number, or symbol characters, then at least one of the following is true:",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/character-key-shortcuts",
    },
    {
        "num": "2.3.1",
        "level": "A",
        "title": "Web pages do not contain anything that flashes more than three times in any one second period, or the flash is below the general flash and red flash thresholds.",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/three-flashes-or-below-threshold",
    },
    {
        "num": "2.4.3",
        "level": "A",
        "title": "If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability.",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/focus-order",
    },
    {
        "num": "2.5.1",
        "level": "A",
        "title": "All functionality that uses multipoint or path-based gestures for operation can be operated with a single pointer without a path-based gesture, unless a multipoint or path-based gesture is essential.",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/pointer-gestures",
    },
    {
        "num": "2.5.2",
        "level": "A",
        "title": "For functionality that can be operated using a single pointer, at least one of the following is true:",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/pointer-cancellation",
    },
    {
        "num": "2.5.4",
        "level": "A",
        "title": "Functionality that can be operated by device motion or user motion can also be operated by user interface components and responding to the motion can be disabled to prevent accidental actuation, except when:",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/motion-actuation",
    },
    {
        "num": "3.2.1",
        "level": "A",
        "title": "When any user interface component receives focus, it does not initiate a change of context.",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/on-focus",
    },
    {
        "num": "3.2.2",
        "level": "A",
        "title": "Changing the setting of any user interface component does not automatically cause a change of context unless the user has been advised of the behavior before using the component.",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/on-input",
    },
    {
        "num": "3.3.1",
        "level": "A",
        "title": "If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/error-identification",
    }
]



