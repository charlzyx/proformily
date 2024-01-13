import { TableColumnType, TableProps } from "antd";
import type { ConfigProviderProps } from "antd/lib/config-provider";
import React, { createContext } from "react";

export interface IArrayTableProSettingsContext {
  columns: {
    dataIndex: string;
    title: string;
    show: boolean;
    pin?: "left" | "right";
    order: number;
  }[];
  reset: () => void;
  size: ConfigProviderProps["componentSize"];
  paginationPosition: Exclude<
    Exclude<TableProps<any>["pagination"], boolean | undefined>["position"],
    undefined
  >[0];
}
export const columnPro = (columns: TableColumnType<any>[]) => {
  const ans = columns.reduce(
    (data, item, idx) => {
      data.list.push({
        dataIndex: item.dataIndex as string,
        title: item.title as string,
        order: idx,
        show: true,
        pin: item.fixed ? (data.info.prevfixed ? "left" : "right") : undefined,
      });
      return data;
    },
    {
      list: [] as IArrayTableProSettingsContext["columns"],
      info: { prevfixed: columns?.[0]?.fixed },
    },
  );
  return ans.list;
};
export const getPaginationPosition = (
  pos: IArrayTableProSettingsContext["paginationPosition"],
): React.CSSProperties["justifyContent"] => {
  return /center/.test(pos)
    ? "center"
    : /left/.test(pos)
      ? "flex-start"
      : "flex-end";
};

export const ArrayTableProSettingsContext =
  createContext<IArrayTableProSettingsContext>({
    columns: [],
    reset() {},
    size: "small",
    paginationPosition: "bottomRight",
  });
