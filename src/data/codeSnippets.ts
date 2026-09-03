import type { Language } from "prism-react-renderer";

export type CodeSnippet = {
  id: string;
  label: string;
  filename: string;
  language: Language;
  code: string;
  pitch: string;
};

export const codeSnippets: CodeSnippet[] = [
  {
    id: "js",
    label: "JavaScript",
    filename: "flatten.js",
    language: "javascript",
    code: `
// рекурсивный обход дерева категорий каталога
function flatten(node) {
  return [node, ...node.children.flatMap(flatten)];
}
    `,
    pitch: "Идея → код → результат",
  },
  {
    id: "ts",
    label: "TypeScript",
    filename: "flatten.ts",
    language: "typescript",
    code: `
type TreeNode = { id: string; children: TreeNode[] };

function flatten(node: TreeNode): TreeNode[] {
  return [node, ...node.children.flatMap(flatten)];
}
    `,
    pitch: "Требования → типы → ноль багов в проде",
  },
  {
    id: "vue",
    label: "Vue",
    filename: "TreeItem.vue",
    language: "typescript",
    code: `
// <script setup lang="ts"> — компонент рендерит сам себя в template
const props = defineProps<{ node: TreeNode }>()

function countDescendants(node: TreeNode): number {
  return node.children.reduce(
    (sum, child) => sum + 1 + countDescendants(child),
    0
  )
}
    `,
    pitch: "Задача → компонент → готовый интерфейс",
  },
  {
    id: "react",
    label: "React",
    filename: "TreeItem.tsx",
    language: "tsx",
    code: `
function TreeItem({ node }: { node: TreeNode }) {
  return (
    <li>
      {node.label}
      {node.children.length > 0 && (
        <ul>
          {node.children.map((child) => (
            <TreeItem key={child.id} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
    `,
    pitch: "Продукт → чистая архитектура → счастливые пользователи",
  },
  {
    id: "nuxt",
    label: "Nuxt",
    filename: "server/api/breadcrumbs.ts",
    language: "typescript",
    code: `
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")!;
  return buildBreadcrumbs(id);
});

async function buildBreadcrumbs(id: string): Promise<string[]> {
  const category = await findCategory(id);
  if (!category.parentId) return [category.name];
  return [...(await buildBreadcrumbs(category.parentId)), category.name];
}
    `,
    pitch: "Бизнес → архитектура → рост без переделок",
  },
  {
    id: "next",
    label: "Next.js",
    filename: "app/comments/CommentThread.tsx",
    language: "tsx",
    code: `
async function CommentThread({ id }: { id: string }) {
  const comment = await getComment(id);
  return (
    <div className="comment">
      <p>{comment.text}</p>
      {comment.replyIds.map((replyId) => (
        <CommentThread key={replyId} id={replyId} />
      ))}
    </div>
  );
}
    `,
    pitch: "Идея → продукт → довольные клиенты",
  },
];
