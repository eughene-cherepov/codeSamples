import { withStyles } from "@utils/hocs/withStyles"

export const useStyles = withStyles(({ colors }) => ({
    container: {
        width: "100%",
        borderRadius: 12,
        height: 56,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
        flexDirection: "row",
        gap: 8,
    },
    disabledContainer: {
        opacity: 0.48,
    },
    text: {
        fontWeight: "500",
        fontSize: 16,
        lineHeight: 20.48,
        color: colors.white,
    },
    pressedText: {
        color: colors.primary,
    },
}))
