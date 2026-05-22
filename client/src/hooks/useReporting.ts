import { useState, useEffect } from "react";
import { reportService } from "../services/report.service";
import type { SalesReport, SalesPeriod } from "../services/report.service";
import toast from "react-hot-toast";

export function useReporting() {
  const [period, setPeriod] = useState<SalesPeriod>("today");
  const [report, setReport] = useState<SalesReport | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchReport();
  }, [period]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const data = await reportService.getSales(period);
      setReport(data);
    } catch (error) {
      console.error("Failed to fetch sales report:", error);
      toast.error("Failed to load sales report.");
    } finally {
      setLoading(false);
    }
  };

  return {
    period,
    setPeriod,
    report,
    loading,
  };
}
