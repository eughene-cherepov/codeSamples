import { withStyles } from "@utils/hocs/withStyles"

export const useStyles = withStyles(({ colors, insets }) => ({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: 56 + insets.top,
        paddingHorizontal: 16,
        backgroundColor: colors.background_primary,
        paddingTop: insets.top,
    },
    leftSide: {
        height: "100%",
    },
    title: {
        color: colors.white,
        fontSize: 18,
        lineHeight: 21.6,
        fontWeight: "600",
        position: "absolute",
        textAlign: "center",
        left: 0,
        right: 0,
        top: insets.top + 16,
    },
    rightSide: {
        height: "100%",
    },
}))
