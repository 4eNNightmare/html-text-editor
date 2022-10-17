export function getSelectionRanges() {
    if (window.getSelection) {
        const selection = window.getSelection();
        if (selection?.getRangeAt && selection.rangeCount) {
            var ranges = [];
            for (var i = 0, len = selection.rangeCount; i < len; ++i) {
                ranges.push(selection.getRangeAt(i));
            }
            return ranges;
        }
    }
    return null;
}
