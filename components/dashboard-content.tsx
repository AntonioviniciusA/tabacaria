"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useEffect, useRef } from "react";
import { useStore } from "@/lib/store-context";
import Chart from "chart.js/auto";

export function DashboardContent() {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  const { analytics, getAnalytics } = useStore();

  // Buscar analytics ao montar
  useEffect(() => {
    getAnalytics();
  }, [getAnalytics]);

  // Criar / atualizar gráfico quando analytics mudar
  useEffect(() => {
    if (!chartRef.current || analytics.length === 0) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: analytics.map((item) => item.productName),
        datasets: [
          {
            label: "Clicks",
            data: analytics.map((item) => item.clicks),
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
        },
      },
    });

    return () => {
      chartInstance.current?.destroy();
    };
  }, [analytics]);

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="bg-black text-white py-6">
        <div className="container mx-auto px-4">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-primary hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
          <h1 className="text-3xl font-bold text-green-500">
            Dashboard Administrativo
          </h1>
        </div>
      </div>

      <div className="mt-8">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Gráficos de Clicks por produto</CardTitle>
          </CardHeader>
          <CardContent>
            <canvas ref={chartRef} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
