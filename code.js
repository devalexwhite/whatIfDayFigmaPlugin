var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
if (figma.editorType === 'figma') {
    figma.showUI(__html__);
    figma.ui.resize(300, 500);
    figma.ui.onmessage = (msg) => __awaiter(this, void 0, void 0, function* () {
        if (msg.type === 'insert') {
            for (const node of figma.currentPage.selection) {
                if (node.type === 'TEXT') {
                    yield figma.loadFontAsync({ family: "SF Pro Display", style: "Regular" });
                    node.characters = msg.field;
                }
            }
        }
        else if (msg.type === "insertAll") {
            setData(msg.data);
        }
        else if (msg.type === "insertLeadCard") {
            try {
                const leadNode = figma.root.findOne(e => e.type === "COMPONENT" && e.name === "Strategy Center/Lead Card");
                if (!leadNode)
                    return;
                leadNode.createInstance();
                setData(msg.data);
            }
            catch (_a) {
                console.log("Failed to load 'Strategy Center/Lead Card' component, please ensure it is in the team library");
            }
        }
        else if (msg.type === "insertAccountCard") {
            try {
                const leadNode = figma.root.findOne(e => e.type === "COMPONENT" && e.name === "Strategy Center/Account Details Card");
                if (!leadNode)
                    return;
                leadNode.createInstance();
                setData(msg.data);
            }
            catch (_b) {
                console.log("Failed to load 'Strategy Center/Account Details Card' component, please ensure it is in the team library");
            }
        }
        else {
            figma.closePlugin();
        }
    });
}
function setData(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const fields = Object.keys(data);
        for (const field of fields) {
            const pageNodes = figma.currentPage.findAll(sceneNode => sceneNode.visible && sceneNode.type === "TEXT" && sceneNode.name.toLowerCase().includes(`field/${field.toLowerCase()}`));
            if (pageNodes.length) {
                yield figma.loadFontAsync({ family: "SF Pro Display", style: "Regular" });
                yield figma.loadFontAsync({ family: "SF Pro Display", style: "Bold" });
                for (const pageNode of pageNodes) {
                    pageNode.characters = data[field];
                }
            }
        }
    });
}
